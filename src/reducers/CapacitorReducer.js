import { SET_DEVICE, SET_PLATFORM } from "../types/capacitor";

const CapacitorReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_PLATFORM:
      return { ...state, platform: payload };
    case SET_DEVICE:
      return { ...state, device: payload };
    default:
      return { ...state };
  }
};
export default CapacitorReducer;
