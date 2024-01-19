import React, { createContext, useReducer } from "react";
import TutorialsReducer from "../reducers/TutorialsReducer";
import { SET_SINGLE_TUTORIAL, TUTORIALS_RECEIVED } from "../types/tutorials";
import TutorialsService from "../services/TutorialsService";

const initialState = {
  tutorials: null,
  tutorial: null,
};

export const TutorialsContext = createContext(initialState);

export const TutorialsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TutorialsReducer, initialState);
  const getTutorials = () => {
    TutorialsService.getTutorials().then((res) => {
      const { tutorials } = res.data;
      dispatch({ type: TUTORIALS_RECEIVED, payload: tutorials });
    });
  };

  const getSingleTutorial = (tutorial_id) => {
    TutorialsService.getSingleTutorial(tutorial_id).then((res) => {
      const { tutorial } = res.data;
      dispatch({ type: SET_SINGLE_TUTORIAL, payload: tutorial });
    });
  };

  return (
    <TutorialsContext.Provider
      value={{ ...state, getTutorials, getSingleTutorial }}
    >
      {children}
    </TutorialsContext.Provider>
  );
};
