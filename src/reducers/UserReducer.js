import {
  LOGIN,
  LOGOUT,
  SHOW_SPINNER,
  HIDE_SPINNER,
  USER_CREATED,
  SHOW_ALERT,
  SET_PROPIEDAD_USER,
  SET_PROPIEDAD_LOGIN,
  SET_USER_DATA,
  SET_PROPERTY_USER_DATA,
  SET_PROFILE,
  SET_PROPERTY_PROFILE,
  SET_OCCUPATION,
  SET_PROPERTY_OCCUPATION,
  SET_CONFIRMATION_RESULT,
  PHONE_EXISTS,
  NOT_AUTH_PROVIDER,
  RESET_AUTH_PROVIDER,
  REFRESH_LOGIN,
} from "../types";

const UserReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, user: payload, spinner: false, refresh: false };
    case LOGOUT:
      return { ...state, user: null };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    case USER_CREATED:
      return { ...state, created: true };
    case SHOW_ALERT:
      return { ...state, error: payload };
    case SET_PROFILE:
      return { ...state, profile: payload };
    case PHONE_EXISTS:
      return { ...state, phoneExists: payload };
    case NOT_AUTH_PROVIDER:
      return { ...state, notAuthProvider: true };
    case RESET_AUTH_PROVIDER:
      return {
        ...state,
        phoneExists: null,
        notAuthProvider: null,
        confirmationResult: null,
      };
    case SET_PROPIEDAD_USER: {
      const { key, value } = payload;
      const user = { ...state.user };
      user[key] = value;
      return { ...state, user };
    }
    case SET_PROPIEDAD_LOGIN: {
      const { key, value } = payload;
      return { ...state, [key]: value };
    }
    case SET_USER_DATA: {
      return { ...state, user_data: payload };
    }
    case SET_PROPERTY_USER_DATA: {
      const user_data = { ...state.user_data };
      const { key, value } = payload;
      user_data[key] = value;
      return { ...state, user_data };
    }
    case SET_PROPERTY_PROFILE: {
      const profile = { ...state.profile };
      const { key, value } = payload;
      profile[key] = value;
      return { ...state, profile };
    }
    case SET_OCCUPATION:
      return { ...state, occupation: payload };
    case SET_PROPERTY_OCCUPATION: {
      const occupation = { ...state.occupation };
      const { key, value } = payload;
      occupation[key] = value;
      return { ...state, occupation };
    }
    case SET_CONFIRMATION_RESULT:
      return { ...state, confirmationResult: payload };
    case REFRESH_LOGIN:
      return { ...state, refresh: true };
    default:
      return { ...state };
  }
};

export default UserReducer;
