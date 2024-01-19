import React, { createContext, useReducer } from "react";
import AppConfigReducer from "../reducers/AppConfigReducer";
import AppConfigService from "../services/AppConfigService";
import { SET_CONFIG, SET_SINGLE_CONFIG } from "../types/appconfig";

const initialState = {};

export const AppConfigContext = createContext(initialState);

export const AppConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppConfigReducer, initialState);

  const getAppConfig = () => {
    AppConfigService.getAppConfig().then((res) => {
      const { config } = res.data;
      dispatch({ type: SET_CONFIG, payload: config });
    });
  };

  const setAppConfig = (key, value) => {
    dispatch({ type: SET_SINGLE_CONFIG, payload: { key, value } });
  };

  const saveAppConfig = async (key, value) => {
    return AppConfigService.putAppconfig(key, value);
  };

  return (
    <AppConfigContext.Provider
      value={{ ...state, getAppConfig, setAppConfig, saveAppConfig }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};
