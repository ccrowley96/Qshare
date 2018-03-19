import axios from 'axios';
import {withRouter} from 'react-router-dom';
import path from 'path';
import moment from 'moment';
export const FETCH_RIDES = 'fetch_rides';
export const CREATE_RIDE = 'create_ride';
export const FETCH_RIDE = 'fetch_ride';
export const DELETE_RIDE = 'delete_ride';
export const FB_USER_STATE = 'facebook_user_info';
export const FETCH_RIDE_BY_UID = 'fetch_rides_by_uid';
export const FETCH_RIDE_BY_PASSENGER_ID = 'fetch_rides_by_passenger_id';
export const LOGIN = 'login';
export const JOIN_RIDE = 'join';
export const LEAVE_RIDE = 'leave';

const LOCAL_ROOT_URL = process.env.LOCAL_ROOT_URL;

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

export function createRide(values, name, uid, link, profile_picture, callback) {
  values.date = moment(values.date, 'YYYY/MM/DD HH:mm A').toISOString();
  values["name"] = name;
  values["uid"] = uid;
  values["link"] = link;
  values["profile_picture"] = profile_picture;
  //Callback redirects user to home page
  const request = axios.post(`${LOCAL_ROOT_URL}/rides`, values)
    .then(() => callback());

  return {
    type: CREATE_RIDE,
    payload: request
  };
}

export function updateRide(values, uid, link, rideID, profile_picture, callback) {
  values.date = moment(values.date, 'YYYY/MM/DD HH:mm A').toISOString();
  values["uid"] = uid;
  values["link"] = link;
  values["rideID"] = rideID;
  values["profile_picture"] = profile_picture;
  //Callback redirects user to home page
  const request = axios.post(`${LOCAL_ROOT_URL}/rides/update`, values)
    .then(() => callback());

  return {
    type: CREATE_RIDE,
    payload: request
  };
}

export function joinRide(rideRequest, callback) {
  //Callback redirects user to home page
  const request = axios.post(`${LOCAL_ROOT_URL}/rides/join`, rideRequest)
    .then(()=>{callback()});
  return {
    type: JOIN_RIDE,
    payload: request
  };
}

export function leaveRide(leaveRequest, callback) {
  //Callback redirects user to home page
  const request = axios.post(`${LOCAL_ROOT_URL}/rides/leave`, leaveRequest)
    .then(()=>{callback()});
  return {
    type: LEAVE_RIDE,
    payload: request
  };
}

export function fetchRide(id, callback) {

  const request = axios.get(`${LOCAL_ROOT_URL}/rides/${id}`).then(callback());
  return {
    type: FETCH_RIDE,
    payload: request
  };
}

export function fetchRidesBy_UID(id) {
  const request = axios.get(`${LOCAL_ROOT_URL}/rides/user/${id}`);
  return {
    type: FETCH_RIDE_BY_UID,
    payload: request
  };
}

export function fetchRidesByPassengerID(id) {
  const request = axios.get(`${LOCAL_ROOT_URL}/rides/passenger/${id}`);
  return {
    type: FETCH_RIDE_BY_PASSENGER_ID,
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
