import { USERS_RECEIVED } from "../types";

const StaffReducer = (state, { type, payload }) => {
  switch (type) {
    case USERS_RECEIVED:
      return { ...state, users: payload };
    default:
      return { ...state };
  }
};
export default StaffReducer;
