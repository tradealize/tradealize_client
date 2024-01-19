import React, { createContext, useReducer } from "react";
import ModalReducer from "../reducers/ModalReducer";
import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_ALERT,
  CLEAR_ALERT,
  CLEAR_MODAL,
  SHOW_SUCCESS,
  SET_RESPONSE,
  CLEAR_SUCCESS,
  MODAL_COMPONENT,
} from "../types";
import { hideModal, showModal } from "../utils";

const initialState = {
  response: "",
  show: false,
  content: "",
  callback: "",
};

const getContent = (content) => {
  if (content.response) {
    if (content.response.data) {
      if (content.response.data.message) {
        return content.response.data.message;
      }
    }
  }
  return content.toString();
};

export const ModalContext = createContext(initialState);

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  function confirm(content, callback, onClose) {
    dispatch({ type: SHOW_MODAL, payload: { content, callback, onClose } });
    showModal();
  }

  function alert(content) {
    if (typeof content === "object") {
      content = getContent(content);
    }
    if (!String(content).includes("401") && !String(content).includes("400")) {
      dispatch({ type: SHOW_ALERT, payload: content });
      setTimeout(() => dispatch({ type: CLEAR_ALERT }), 5000);
    }
  }

  function success(content) {
    dispatch({ type: SHOW_SUCCESS, payload: content });
    setTimeout(() => {
      dispatch({ type: CLEAR_SUCCESS });
    }, 3000);
  }

  function hideAlert() {
    dispatch({ type: CLEAR_ALERT });
  }

  function modalComponent(title, component, options = {}) {
    dispatch({
      type: MODAL_COMPONENT,
      payload: { title, component, ...options },
    });
    showModal();
  }

  function fullscreenModal(title, component, onClose, callback) {
    dispatch({
      type: MODAL_COMPONENT,
      payload: { title, component, onClose, callback, fullscreen: true },
    });
    showModal();
  }

  function setResponse(response) {
    dispatch({ type: SET_RESPONSE, payload: response });
    dispatch({ type: HIDE_MODAL });
  }

  function clear() {
    dispatch({ type: CLEAR_MODAL });
  }

  function clearModal() {
    dispatch({ type: CLEAR_MODAL });
    hideModal();
  }

  function clearSuccess() {
    dispatch({ type: CLEAR_SUCCESS });
  }

  function clearAlert() {
    dispatch({ type: CLEAR_ALERT });
  }
  return (
    <ModalContext.Provider
      value={{
        ...state,
        alert,
        clear,
        confirm,
        success,
        hideAlert,
        clearModal,
        clearAlert,
        setResponse,
        clearSuccess,
        modalComponent,
        fullscreenModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
