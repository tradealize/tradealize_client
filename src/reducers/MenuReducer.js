import { SELECT_TABS, SET_SELECTED, TOGGLE_SETTINGS } from "../types/menu";

const MenuReducer = (state, { type, payload }) => {
  switch (type) {
    case SELECT_TABS:
      return { ...state, tabs: payload };
    case SET_SELECTED:
      return { ...state, selected: payload };
    case TOGGLE_SETTINGS:
      return { ...state, showSettings: !state.showSettings };
    default:
      return { ...state };
  }
};

export default MenuReducer;
