import {
  SHOW_MODAL,
  SET_RESPONSE,
  HIDE_MODAL,
  CLEAR,
  MODAL_COMPONENT,
  SHOW_ALERT,
  SHOW_SUCCESS,
  CLEAR_ALERT,
  CLEAR_SUCCESS,
  CLEAR_MODAL,
} from "../types";

const ModalReducer = (state, { type, payload }) => {
  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        title: "Caution",
        showModal: true,
        onCancel: payload.onClose,
        onClose: payload.onClose,
        content: payload.content,
        callback: payload.callback,
      };
    case HIDE_MODAL:
      return { ...state, show: false };
    case SET_RESPONSE:
      return { ...state, response: payload };
    case MODAL_COMPONENT:
      return {
        ...state,
        ...payload,
        showModal: true,
      };
    case CLEAR_MODAL:
      return {
        ...state,
        size: undefined,
        show: false,
        showModal: false,
        content: "",
        component: "",
        title: "",
        onClose: "",
        callback: "",
        hideHeader: false,
      };
    case SHOW_ALERT:
      return { ...state, showAlert: true, alertContent: payload };
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertContent: "" };
    case CLEAR:
      return { ...state };
    case SHOW_SUCCESS:
      return { ...state, showSuccess: true, successContent: payload };
    case CLEAR_SUCCESS:
      return { ...state, showSuccess: false, successContent: "" };
    default:
      return { ...state };
  }
};

export default ModalReducer;
