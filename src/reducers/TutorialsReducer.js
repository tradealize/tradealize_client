import { SET_SINGLE_TUTORIAL, TUTORIALS_RECEIVED } from "../types/tutorials";

const TutorialsReducer = (state, { type, payload }) => {
  switch (type) {
    case TUTORIALS_RECEIVED:
      return { ...state, tutorials: payload };
    case SET_SINGLE_TUTORIAL:
      return { ...state, tutorial: payload };
    default:
      return { ...state };
  }
};
export default TutorialsReducer;
