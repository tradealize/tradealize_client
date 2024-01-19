import React, { createContext, useReducer } from "react";
import FiltersReducer from "../reducers/FiltersReducer";
import { SET_FILTER } from "../types";

const initialState = {
  query: "",
  Training: "",
};

export const FiltersContext = createContext(initialState);

export const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FiltersReducer, initialState);

  const setFilter = (key, value, namespace) => {
    dispatch({ type: SET_FILTER, payload: { key, value, namespace } });
  };

  return (
    <FiltersContext.Provider value={{ ...state, setFilter }}>
      {children}
    </FiltersContext.Provider>
  );
};
