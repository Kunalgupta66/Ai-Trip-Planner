import React, { useEffect, useState } from "react";
import { fetchPlaceSuggestions } from "../Api/PlaceAutocomplete";
import { BudgetOptions, TravelesList, AI_PROMPT } from "../Budget/option";
import { chatSession } from "../service/AImodel";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { LuLoaderPinwheel } from "react-icons/lu";
import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router";

function CreateTrip() {
  const [fromDate, setFromDate] = useState({
    location: { label: "" },
    noOfDays: "",
    budget: "",
    traveler: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [tripPlan, setTripPlan] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFromDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Updated fromDate:", fromDate);
  }, [fromDate]);

  const handleDestinationChange = async (e) => {
    const inputValue = e.target.value;
    handleInputChange("location", { label: inputValue });

    if (inputValue.length > 2) {
      const results = await fetchPlaceSuggestions(inputValue);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Google login success:", codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  const onGenerateTrip = async () => {
    if (!user) {
      setOpenDialog(true);
      return;
    }
  
    if (!fromDate?.location?.label || !fromDate?.noOfDays || !fromDate?.budget || !fromDate?.traveler) {
      alert("Please fill in all fields.");
      return;
    }
  
    setLoading(true); // Set loading to true *before* starting AI generation
  
    try {  // Add a try-catch block for error handling
      const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", fromDate?.location?.label)
        .replace("{totalDays}", fromDate?.noOfDays)
        .replace("{travelers}", fromDate?.traveler)
        .replace("{budget}", fromDate.budget)
        .replace("{totalDays}", fromDate?.noOfDays);
  
      const result = await chatSession.sendMessage(FINAL_PROMPT);
  
      console.log("--", result?.response?.text());
  
      await SaveAiTrip(result?.response?.text()); // Await the Firestore save operation
  
    } catch (error) {
      console.error("Error during trip generation or save:", error);
      // Handle the error appropriately, e.g., display an error message to the user.
      alert("An error occurred while generating your trip. Please try again."); 
    } finally {
      setLoading(false); // Set loading to false *in the finally block* to ensure it always runs
    }
  };
  
  
  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: fromDate,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId
      });
      console.log("Trip data saved to Firestore"); // Optional: Log success
      navigate('/view-trip/'+docId)
  
    } catch (error) {
      console.error("Error saving trip to Firestore:", error);
      // Handle error, e.g., alert user or retry
      alert("An error occurred while saving your trip. Please try again.");
    }
  };

  const GetUserProfile = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("No access token found.");
      return;
    }

    axios
      .get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log("User profile:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };


  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Provide some details, and our AI trip planner will generate a personalized itinerary for you.
      </p>

      <div className="mt-20">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">Where do you want to go?</h2>
          <div className="mb-5 relative">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your destination..."
              value={fromDate.location?.label || ""}
              onChange={handleDestinationChange}
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-48 overflow-y-auto rounded-lg shadow-lg">
                {suggestions.map((place, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      handleInputChange("location", { label: place.description });
                      setSuggestions([]);
                    }}
                  >
                    {place.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Days Input */}
        <div>
          <label className="text-xl my-3 font-medium">How many days?</label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter number of days..."
            value={fromDate.noOfDays || ""}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">Select Your Budget</h2>
          <div className="grid grid-cols-3 gap-4">
            {BudgetOptions.map((item) => (
              <div
                key={item.id}
                className={`border p-4 rounded-lg cursor-pointer ${fromDate?.budget === item.title ? "bg-green-100" : ""}`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <div className="text-2xl">{item.icon}</div>
                <h4 className="text-lg font-medium">{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">Who are you traveling with?</h2>
          <div className="grid grid-cols-3 gap-4">
            {TravelesList.map((item) => (
              <div
                key={item.id}
                className={`border p-4 rounded-lg cursor-pointer ${fromDate?.traveler === item.people ? "bg-green-100" : ""}`}
                onClick={() => handleInputChange("traveler", item.people)}
              >
                <div className="text-2xl">{item.icon}</div>
                <h4 className="text-lg font-medium">{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="my-10">
           <button
             disabled={loading}
             onClick={onGenerateTrip}
             className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-7 py-4.5 flex items-center justify-center"
           >
             {loading ? <LuLoaderPinwheel className="h-5 w-5 animate-spin" /> : 'Generate Trip'}
           </button>
        </div>

        {/* Sign-In Dialog */}
        {openDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold">Sign in to Continue</h2>
              <p className="mt-2 text-gray-600">You need to sign in with Google to generate a trip plan.</p>

              <div className="mt-4 flex flex-col items-center space-y-3">
                <button
                  onClick={login}
                  className="flex items-center justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5"
                >
                  <FcGoogle /> Sign in With Google
                </button>

                <button
                  className="text-red-500 font-medium"
                  onClick={() => setOpenDialog(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default CreateTrip;