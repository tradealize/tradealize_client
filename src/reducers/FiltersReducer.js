import { SET_FILTER } from "../types";

const FiltersReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_FILTER:
      const { key, value, namespace } = payload;
      if (namespace && namespace !== "" && namespace !== null) {
        return { ...state, [namespace]: { ...state.namespace, [key]: value } };
      }
      return { ...state, [key]: value };
    default:
      return { ...state };
  }
};
export default FiltersReducer;
