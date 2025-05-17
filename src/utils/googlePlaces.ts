const BACKEND_URL = 'https://europe-west10-cassini-hackathon-460110.cloudfunctions.net';

// Function to search for places
export const searchPlaces = async (query: string) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/search_places?query=${encodeURIComponent(query)}&country=de`
    );
    const data = await response.json();
    console.log("Search places response:", data);
    return data;
  } catch (error) {
    console.error('Error searching places:', error);
    throw error;
  }
};

// Function to get place details
export const getPlaceDetails = async (placeId: string) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/get_place_details?place_id=${placeId}`
    );
    const data = await response.json();
    console.log("Place details response:", data);
    return data;
  } catch (error) {
    console.error('Error getting place details:', error);
    throw error;
  }
};

// Function to get place autocomplete suggestions
export const getPlaceAutocomplete = async (input: string) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/get_place_suggestions?input=${encodeURIComponent(input)}&country=de`
    );
    const data = await response.json();
    console.log("Autocomplete suggestions response:", data);
    return data;
  } catch (error) {
    console.error('Error getting autocomplete suggestions:', error);
    throw error;
  }
};

// Function to get delivery options based on coordinates
export const getDeliveryOptions = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/get_user_location?lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    console.log("Delivery options response:", data);
    return data;
  } catch (error) {
    console.error('Error getting delivery options:', error);
    throw error;
  }
};
