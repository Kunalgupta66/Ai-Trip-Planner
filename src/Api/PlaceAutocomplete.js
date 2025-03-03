const API_KEY = 'a9fe63d2e3mshca2bb2fcedd884bp1b4fdbjsn2ec1ec010171'; 
const API_HOST = "place-autocomplete1.p.rapidapi.com";

export const fetchPlaceSuggestions = async (input) => {
  if (input.length < 2) return [];

  const url = `https://${API_HOST}/autocomplete/json?input=${input}&radius=500`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    });
    const data = await response.json();
    return data.predictions || [];
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};
