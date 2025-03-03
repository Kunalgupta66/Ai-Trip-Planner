import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey =import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Pan for Location: Goa l, for 3 days for couple with a cheap budget,  give me a hotels options list with hotelname, hotel address,  price , hotel image url , geo coordinate,  rating,  description  and suggest itinerary with placeName, place details, place image url, geo coordinate,  ticket price, time  travel  each of the location for 3 days with each day plan with beat time to visit in json formate\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"travelPlan\": {\n    \"location\": \"Goa\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\",\n     \"hotels\": [\n        {\n          \"hotelName\": \"Zostel Goa (Hostel)\",\n          \"hotelAddress\": \"Opposite St. Michael's Church, Anjuna, Goa 403509\",\n          \"price\": \"₹600-₹1200/night (for a private room)\",\n          \"hotelImageUrl\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/9a/78/82/zostel-goa.jpg?w=900&h=-1&s=1\",\n           \"geoCoordinate\": {\n              \"latitude\": 15.571681,\n              \"longitude\": 73.736928\n            },\n          \"rating\": 4.2,\n          \"description\": \"A popular and vibrant hostel known for its social atmosphere, clean dorms and private rooms available, and is located near Anjuna Beach. Great for budget travelers.\"\n        },\n         {\n          \"hotelName\": \"Red Door Hostel\",\n          \"hotelAddress\": \"H No 749/2(2), near st anthony chapel, Anjuna, Goa 403509\",\n          \"price\": \"₹700-₹1400/night (for a private room)\",\n          \"hotelImageUrl\":\"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/8b/2a/b6/red-door-hostel.jpg?w=900&h=-1&s=1\",\n            \"geoCoordinate\": {\n              \"latitude\": 15.570581,\n              \"longitude\": 73.740015\n             },\n          \"rating\": 4.0,\n          \"description\": \"Offers comfortable stay with budget-friendly options, vibrant and colourful decor, and a good atmosphere. Close to Anjuna Flea Market.\"\n         },\n         {\n          \"hotelName\": \"Backpacker Panda, Candolim\",\n          \"hotelAddress\": \"House No. 745/2, Gaura Vaddo, Candolim, Bardez, Goa, 403515\",\n           \"price\": \"₹800 - ₹1500/night (for a private room)\",\n          \"hotelImageUrl\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f8/9b/38/backpacker-panda-candolim.jpg?w=900&h=-1&s=1\",\n           \"geoCoordinate\": {\n              \"latitude\": 15.524722,\n              \"longitude\": 73.759004\n            },\n          \"rating\": 4.1,\n          \"description\": \"Well-maintained hostel offering both dorms and private rooms. Good amenities, friendly staff, and close to Candolim Beach and main attractions.\"\n        }\n      ],\n\n     \"itinerary\": {\n      \"day1\": {\n        \"theme\": \"North Goa Beaches & Local Flavors\",\n        \"morning\": {\n          \"time\": \"9:00 AM\",\n          \"placeName\": \"Anjuna Beach\",\n          \"placeDetails\": \"Relax on the beach, take a dip in the sea. Can enjoy some watersports at reasonable costs.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Anjuna_beach_Goa.jpg/1280px-Anjuna_beach_Goa.jpg\",\n          \"geoCoordinate\": {\n             \"latitude\": 15.570278,\n             \"longitude\": 73.734167\n           },\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"Check from your hotel location\",\n           \"bestTimeToVisit\":\"Morning or evening\"\n\n         },\n         \"afternoon\": {\n            \"time\": \"1:00 PM\",\n            \"placeName\": \"Anjuna Flea Market (Wednesday)\",\n            \"placeDetails\": \"Explore the local market (open on Wednesdays) for souvenirs, clothes, and accessories at bargain prices. \",\n           \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/f/f6/Anjuna_Market_Goa.JPG\",\n            \"geoCoordinate\": {\n              \"latitude\": 15.568530,\n              \"longitude\": 73.732652\n            },\n            \"ticketPrice\": \"Free\",\n           \"travelTime\": \"Few minutes from Anjuna Beach\",\n           \"bestTimeToVisit\":\"afternoon\"\n          },\n         \"evening\": {\n          \"time\": \"4:00 PM\",\n           \"placeName\": \"Vagator Beach\",\n           \"placeDetails\": \"Visit the scenic Vagator Beach, known for its cliffs and sunset views.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/4/49/Vagator_Beach_Goa.jpg\",\n           \"geoCoordinate\": {\n              \"latitude\": 15.593056,\n              \"longitude\": 73.732222\n             },\n            \"ticketPrice\": \"Free\",\n           \"travelTime\": \"15 minutes from Anjuna\",\n            \"bestTimeToVisit\":\"Late afternoon or Sunset\"\n         },\n          \"night\":{\n           \"time\": \"7:30 PM\",\n           \"placeName\": \"Dinner at a Local Shack\",\n           \"placeDetails\": \"Enjoy fresh seafood and Goan cuisine at a local beach shack in Vagator. Example:  Curlies or Shiva Valley\",\n            \"placeImageUrl\": \"https://lh3.googleusercontent.com/p/AF1QipOzK2H5K9r88xZ_6rKj54a4u-n3KjXf-h0R73Qn=s680-w680-h510\",\n           \"geoCoordinate\": {\n             \"latitude\": 15.593889,\n              \"longitude\": 73.734444\n            },\n           \"ticketPrice\": \"₹500-₹800 (approx for two)\",\n           \"travelTime\": \"Near Vagator Beach\",\n             \"bestTimeToVisit\":\"Evening\"\n        }\n\n      },\n       \"day2\": {\n        \"theme\": \"Exploring Panjim & Old Goa\",\n        \"morning\": {\n          \"time\": \"9:00 AM\",\n           \"placeName\": \"Fontainhas (Latin Quarter)\",\n           \"placeDetails\": \"Walk through the colorful streets of the old Latin Quarter in Panjim. Explore its architecture and quaint cafes.\",\n           \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/8/85/Fontainhas_Goa.jpg\",\n          \"geoCoordinate\": {\n            \"latitude\": 15.501828,\n            \"longitude\": 73.828022\n            },\n            \"ticketPrice\": \"Free\",\n            \"travelTime\": \"1 hour from North Goa\",\n            \"bestTimeToVisit\":\"Morning\"\n        },\n        \"afternoon\": {\n           \"time\": \"12:00 PM\",\n          \"placeName\": \"Basilica of Bom Jesus\",\n          \"placeDetails\": \"Visit this UNESCO World Heritage Site, an old church in Old Goa\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/a/a8/Basilica_of_Bom_Jesus_Goa_India.jpg\",\n            \"geoCoordinate\": {\n             \"latitude\": 15.500298,\n             \"longitude\": 73.920122\n           },\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"30 minutes from Fontainhas\",\n           \"bestTimeToVisit\":\"Afternoon\"\n        },\n        \"evening\": {\n           \"time\": \"3:00 PM\",\n          \"placeName\": \"Se Cathedral\",\n          \"placeDetails\": \"Explore Se Cathedral, one of the largest churches in Asia, located in Old Goa.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/7/73/Se_Cathedral%2C_Goa.jpg\",\n            \"geoCoordinate\": {\n               \"latitude\": 15.500733,\n               \"longitude\": 73.921800\n            },\n          \"ticketPrice\": \"Free\",\n            \"travelTime\": \"Walking distance from Basilica of Bom Jesus\",\n            \"bestTimeToVisit\":\"Afternoon\"\n        },\n         \"night\":{\n           \"time\": \"6:00 PM\",\n           \"placeName\": \"Dona Paula Jetty\",\n           \"placeDetails\": \"Enjoy a relaxed evening view and dinner at Dona Paula Jetty .\",\n           \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/d/da/Dona_Paula_Jetty.jpg\",\n             \"geoCoordinate\": {\n                 \"latitude\": 15.404167,\n                 \"longitude\": 73.799444\n            },\n          \"ticketPrice\": \"Free\",\n             \"travelTime\": \"30 minutes from Old Goa\",\n              \"bestTimeToVisit\":\"Evening\"\n        }\n      },\n       \"day3\": {\n        \"theme\": \"South Goa Exploration\",\n        \"morning\": {\n           \"time\": \"9:00 AM\",\n          \"placeName\": \"Palolem Beach\",\n          \"placeDetails\": \"Head to the calm and beautiful Palolem beach for a morning walk. You can choose to go kayaking.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/c/c9/Palolem_beach.jpg\",\n           \"geoCoordinate\": {\n              \"latitude\": 15.011944,\n              \"longitude\": 74.012500\n            },\n           \"ticketPrice\": \"Free\",\n           \"travelTime\": \"2 hours from Panjim\",\n           \"bestTimeToVisit\":\"Morning or evening\"\n        },\n        \"afternoon\": {\n          \"time\": \"1:00 PM\",\n          \"placeName\": \"Patnem Beach\",\n          \"placeDetails\": \"Visit Patnem Beach, a quiet and peaceful beach just south of Palolem. Good for relaxation and lunch\",\n           \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Patnem_Beach_Goa.jpg/1280px-Patnem_Beach_Goa.jpg\",\n           \"geoCoordinate\": {\n              \"latitude\": 14.999722,\n              \"longitude\": 74.012778\n            },\n            \"ticketPrice\": \"Free\",\n            \"travelTime\": \"10 minutes from Palolem Beach\",\n             \"bestTimeToVisit\":\"Afternoon\"\n        },\n        \"evening\": {\n          \"time\": \"4:00 PM\",\n          \"placeName\": \"Agonda Beach\",\n          \"placeDetails\": \"Enjoy the scenic Agonda beach, known for its serenity and beautiful coastline. Relax and watch the sunset\",\n           \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/1/1d/Agonda_Beach_Goa.jpg\",\n          \"geoCoordinate\": {\n             \"latitude\": 15.080833,\n              \"longitude\": 73.978056\n            },\n          \"ticketPrice\": \"Free\",\n          \"travelTime\": \"30 minutes from Patnem Beach\",\n           \"bestTimeToVisit\":\"Late afternoon or Sunset\"\n        },\n          \"night\":{\n           \"time\": \"7:30 PM\",\n           \"placeName\": \"Dinner at Agonda Shack\",\n           \"placeDetails\": \"Enjoy your last Goan dinner at a local shack in Agonda before heading to your next destination.\",\n            \"placeImageUrl\": \"https://lh3.googleusercontent.com/p/AF1QipMsbH9JpC_4-T52l4Q0mH42I_u4wB0Iu89G2gS8=s680-w680-h510\",\n           \"geoCoordinate\": {\n             \"latitude\": 15.080833,\n              \"longitude\": 73.978056\n            },\n           \"ticketPrice\": \"₹500-₹800 (approx for two)\",\n           \"travelTime\": \"Near Agonda beach\",\n              \"bestTimeToVisit\":\"Evening\"\n\n        }\n\n      }\n    }\n  }\n}\n```"},
          ],
        },
      ],
    });
  
  