import { SET_LANG } from "../types/translations";

const TranslationsReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_LANG:
      return { ...state, lang: payload };
    default:
      return { ...state };
  }
};
export default TranslationsReducer;
