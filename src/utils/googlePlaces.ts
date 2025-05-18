const BACKEND_URL = 'https://europe-west10-cassini-hackathon-460110.cloudfunctions.net';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const API_TIMEOUT = 10000; // 10 seconds timeout

// Simple cache implementation
const cache = new Map<string, { data: any; timestamp: number }>();

// Helper function to handle API calls with timeout
const fetchWithTimeout = async (url: string, options = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

// Function to search for places
export const searchPlaces = async (query: string) => {
  const cacheKey = `search_${query}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetchWithTimeout(
      `${BACKEND_URL}/search_places?query=${encodeURIComponent(query)}&country=de`
    );
    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('Error searching places:', error);
    throw error;
  }
};

// Function to get place details
export const getPlaceDetails = async (placeId: string) => {
  const cacheKey = `details_${placeId}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetchWithTimeout(
      `${BACKEND_URL}/get_place_details?place_id=${placeId}`
    );
    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('Error getting place details:', error);
    throw error;
  }
};

// Function to get place autocomplete suggestions
export const getPlaceAutocomplete = async (input: string) => {
  const cacheKey = `autocomplete_${input}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetchWithTimeout(
      `${BACKEND_URL}/get_place_suggestions?input=${encodeURIComponent(input)}&country=de`
    );
    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('Error getting autocomplete suggestions:', error);
    throw error;
  }
};

// Function to get delivery options based on coordinates
export const getDeliveryOptions = async (lat: number, lon: number) => {
  const cacheKey = `delivery_${lat}_${lon}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetchWithTimeout(
      `${BACKEND_URL}/get_user_location?lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('Error getting delivery options:', error);
    throw error;
  }
};
