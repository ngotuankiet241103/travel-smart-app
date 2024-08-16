/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';


const API_KEY = 'AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI';
const BASE_URL = 'https://api.datacommons.org';

export const fetchPlaceDetails = async (placeId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/v1/place/${placeId}?key=${API_KEY}`
    );
    const data = response.data;
    
    // Process and return the data as needed
    return data;
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};

// Example usage
fetchPlaceDetails('somePlaceId').then((data) => {
  console.log(data);
});


export const fetchPlaceDetailsWithExtras = async (placeId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/v1/place/${placeId}?key=${API_KEY}&extraImages=true&extraTypes=true`
    );
    const data = response.data;
    
    const images = data.images || [];
    const placeType = data.type || 'Unknown';
    
    return { data, images, placeType };
  } catch (error) {
    console.error('Error fetching place details with extras:', error);
    return null;
  }
};

// Example usage
fetchPlaceDetailsWithExtras('somePlaceId').then((data) => {
  console.log(data);
});

