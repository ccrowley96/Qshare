import axios from 'axios';

export const FETCH_RIDES = 'fetch_rides';
export const CREATE_RIDE = 'create_ride';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

const LOCAL_ROOT_URL = "http://localhost:3000/api";

export function fetchRides() {
  const request = axios.get(`${LOCAL_ROOT_URL}/rides`);

  return {
    type: FETCH_RIDES,
    payload: request
  };
}

export function createRide(values, callback) {
  //Callback redirects user to home page
  const request = axios.post(`${LOCAL_ROOT_URL}/rides`, values)
    .then(() => callback());

  return {
    type: CREATE_RIDE,
    payload: request
  };
}

export function fetchRide(id) {
  const request = axios.get(`${LOCAL_ROOT_URL}/rides/${id}`);
  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deleteRide(id, callback) {
  const request = axios.delete(`${LOCAL_ROOT_URL}/rides/${id}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  };
}
