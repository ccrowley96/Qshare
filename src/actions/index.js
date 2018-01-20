import axios from 'axios';

export const FETCH_RIDES = 'fetch_rides';

const LOCAL_ROOT_URL = "http://localhost:3000/api";
const API_KEY = "?key=qshare90210";

export function fetchRides() {
  const request = axios.get(`${LOCAL_ROOT_URL}/rides${API_KEY}`);

  return {
    type: FETCH_RIDES,
    payload: request
  };
}
