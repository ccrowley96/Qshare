import axios from 'axios';
import {withRouter} from "react-router-dom";

export const FETCH_RIDES = 'fetch_rides';
export const CREATE_RIDE = 'create_ride';
export const FETCH_RIDE = 'fetch_ride';
export const DELETE_RIDE = 'delete_ride';
export const FB_LOGIN = 'facebook_login';
export const FB_LOGOUT = 'facebook_logout';
export const FB_USER_STATE = 'facebook_user_info';

const LOCAL_ROOT_URL = "http://localhost:3000/api";

export function fb_status_change(status, callback) {
  if (status === false) {
    callback();
  }
  return {
    type: FB_LOGIN,
    payload: status
  };
}

export function fb_user_state(userInfo) {
  return {
    type: FB_USER_STATE,
    payload: userInfo
  };
}

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
    type: FETCH_RIDE,
    payload: request
  };
}

export function deleteRide(id, callback) {
  const request = axios.delete(`${LOCAL_ROOT_URL}/rides/${id}`)
    .then(() => callback());

  return {
    type: DELETE_RIDE,
    payload: id
  };
}
