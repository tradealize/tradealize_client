import React, { useReducer, createContext, useContext } from "react";
import TranslationsReducer from "../reducers/TranslationsReducer";
import { SET_LANG } from "../types/translations";
import translations from "../utils/translations";

const initialState = {
  translations: translations,
  lang: "en",
};


export const TranslationsContext = createContext(initialState);
export const TranslationsProvider = ({ children }) => {

  const [state, dispatch] = useReducer(TranslationsReducer, initialState);

  const setLang = (lang) => {
    if (lang == state.lang) { return }
    dispatch({ type: SET_LANG, payload: lang });
  };

  return (
    <TranslationsContext.Provider value={{ ...state, setLang }}>
      {children}
    </TranslationsContext.Provider>
  );
};
