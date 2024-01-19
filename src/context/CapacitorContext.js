import React, { createContext, useReducer } from "react";
import CapacitorReducer from "../reducers/CapacitorReducer";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SET_DEVICE, SET_PLATFORM } from "../types/capacitor";
import { Capacitor } from "@capacitor/core";
import { Device } from "@capacitor/device";

const initialState = {
  platform: null,
  device: null,
};

export const CapacitorContext = createContext(initialState);

export const CapacitorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CapacitorReducer, initialState);

  const setupPlatform = () => {
    const platform = Capacitor.getPlatform();
    dispatch({ type: SET_PLATFORM, payload: platform });
  };

  const setupStatusBar = () => {
    StatusBar.setStyle({ style: Style.Dark });
  };

  const setupDevice = () => {
    Device.getInfo().then((info) => {
      dispatch({ type: SET_DEVICE, payload: info.Training });
    });
  };

  return (
    <CapacitorContext.Provider
      value={{ ...state, setupDevice, setupPlatform, setupStatusBar }}
    >
      {children}
    </CapacitorContext.Provider>
  );
};
