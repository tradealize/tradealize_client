import React, { createContext, useContext, useReducer } from "react";
import FilesService from "../services/FilesService";
import UserReducer from "../reducers/UserReducer";
import {
  LOGIN,
  LOGOUT,
  PHONE_EXISTS,
  SHOW_SPINNER,
  HIDE_SPINNER,
  EDITAR_USUARIO,
  GUARDAR_USUARIO,
  SET_PROPIEDAD_USER,
  RESET_AUTH_PROVIDER,
  SET_CONFIRMATION_RESULT,
  REFRESH_LOGIN,
} from "../types";
import UserService from "../services/UserService";
import { ModalContext } from "./ModalContext";
import { navigate } from "@reach/router";
import { hideModal } from "../utils";
import moment from "moment";
import { AppConfigContext } from "./AppConfigContext";
import FirebaseService from "../services/FirebaseService";
import useTranslations from "../hooks/useTranslations";

const initialState = {
  user: null,
  cuenta: null,
  correo: null,
  refresh: false,
  spinner: false,
  password: null,
  telefono: null,
  user_data: null,
  direccion: null,
  phoneExists: null,
  notAuthProvider: null,
  confirmationResult: null,
  linkedPlatforms: [
    { name: "gmail", title: 'Gmail', icon: 'https://www.vectorlogo.zone/logos/gmail/gmail-icon.svg' },
    { name: "facebook", title: 'Facebook', icon: 'https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg' },
    // { name: "instagram", title: 'Instagram', icon: 'URL_TO_INSTAGRAM_ICON' },
  ]
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const { firebaseConfig } = useContext(AppConfigContext);

  const { success, alert } = useContext(ModalContext);

  const AuthService = FirebaseService(firebaseConfig);

  const translations = useTranslations();

  function resetAuthProvider() {
    dispatch({ type: RESET_AUTH_PROVIDER });
  }

  function refreshLogin() {
    dispatch({ type: REFRESH_LOGIN });
  }

  function phoneNumberExists(phoneNumber) {
    UserService.getUserByPhone(phoneNumber)
      .then(() => {
        dispatch({ type: PHONE_EXISTS, payload: true });
      })
      .catch(() => {
        alert("We're sorry, we couldn't find an account with that number.");
        dispatch({ type: PHONE_EXISTS, payload: false });
      });
  }

  function signInWithPhoneNumber(phoneNumber, appVerifier) {
    dispatch({ type: SHOW_SPINNER });
    AuthService.signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        dispatch({
          type: SET_CONFIRMATION_RESULT,
          payload: confirmationResult,
        });
        dispatch({ type: HIDE_SPINNER });
      })
      .catch((error) => {
        alert(error);
        dispatch({ type: HIDE_SPINNER });
      });
  }

  function signIn(email, password, callback) {
    dispatch({ type: SHOW_SPINNER });
    AuthService.signIn(email, password)
      .then((user) => {
        if (user) {
          getCurrentUser();
          if (typeof callback === "function") {
            callback();
          }
        } else {
          alert("Email or password is incorrect, please try again.");
          dispatch({ type: HIDE_SPINNER });
          AuthService.signOut();
        }
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        alert(error);
      });
  }

  function userLoggedIn() {
    dispatch({ type: SHOW_SPINNER });
    AuthService.userLoggedIn(getCurrentUser, (error) => {
      if (error) {
        alert(error);
        AuthService.signOut();
      }
      dispatch({ type: HIDE_SPINNER });
    });
  }

  function signOut() {
    AuthService.signOut()
      .then(() => {
        window.localStorage.clear();
        dispatch({ type: LOGOUT });
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  }

  function signUpPhone(name, phone, uid) {
    UserService.postSignUp({
      name,
      phone,
      uid,
    }).then(() => {
      AuthService.handleToken().then(() => {
        getCurrentUser();
      });
    });
  }

  function linkUserPhone(phone) {
    AuthService.linkPhoneNumber(phone);
  }

  function signInPhone() {
    AuthService.handleToken().then(() => {
      getCurrentUser();
    });
  }

  async function signUp(nombre, apellidos, correo, password, telefono) {
    dispatch({ type: SHOW_SPINNER });
    if (!nombre || nombre === "") return alert("Ingresa tu nombre");
    if (!correo || correo === "") return alert("Ingresa tu correo");
    if (!telefono || telefono === "") return alert("Ingresa tu telefono");
    AuthService.signUp(correo, password)
      .then((user) => {
        const uid = user.user.uid;
        UserService.postSignUp({
          name: nombre,
          email: correo,
          phone: telefono,
          last_name: apellidos,
          uid,
        }).then(() => {
          signIn(correo, password);
        });
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        if (error.response) {
          if (error.response.status === 412) {
            return alert("You already have an account, please login.");
          }
        }
        if (error.message === "EMAIL_EXISTS") {
          return alert("You already have an account, please login.");
        }
        alert(error.toString());
      });
  }

  function getCurrentUser() {
    UserService.getCurrentUser()
      .then((res) => {
        const { user } = res.data;
        dispatch({ type: LOGIN, payload: user });
        AuthService.setupInterceptors(refreshLogin);
      })
      .catch(signOut);
  }

  function editarUsuario() {
    dispatch({ type: EDITAR_USUARIO });
  }

  function cancelEdit() {
    dispatch({ type: GUARDAR_USUARIO });
  }

  function setPropertyUser(key, value) {
    if (key === "idFile") {
      dispatch({ type: SET_PROPIEDAD_USER, payload: { key: "file", value } });
      if (!value) {
        dispatch({ type: SET_PROPIEDAD_USER, payload: { key, value } });
      }
    } else {
      if (key === "telefono") {
        value = String(value).replace(/\D/g, "");
        value = String(value).substring(0, 10);
      }
      dispatch({ type: SET_PROPIEDAD_USER, payload: { key, value } });
    }
  }

  function recoverPassword(email) {
    AuthService.recoverPassword(email)
      .then(() => {
        success(translations.auth.reset_password);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          UserService.recoverPassword(email).then(() => {
            success(translations.auth.reset_password);
          });
        } else {
          alert(translations.auth.error);
        }
      });
  }

  function updateUser(usuario, callback, hideAlert) {
    const promises = [];
    let data = { ...usuario };
    delete data.purchases;
    if (data.picture && data.picture !== null) {
      if (data.picture.name) {
        const promiseFile = new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", data.picture);
          FilesService.postFile(formData).then((res) => {
            const { file_id } = res.data;
            data.file_id = file_id;
            resolve();
          });
        });
        promises.push(promiseFile);
      }
    }
    Promise.all(promises).then(() => {
      delete data.file;
      delete data.uid;
      delete data.activo;
      data.birthday = moment(data.birthday).format("YYYY-MM-DD");
      UserService.updateCurrentUser(data)
        .then(() => {
          getCurrentUser();
          if ((typeof hideAlert === "boolean" && !hideAlert) || hideAlert === undefined) {
            success(translations.auth.saved);
          }
          if (typeof callback === "function") {
            return callback();
          }
        })
        .catch((error) => {
          alert(error);
        });
    });
  }

  function deleteCustomer() {
    dispatch({ type: SHOW_SPINNER });
    UserService.deleteCurrentUser()
      .then(() => {
        dispatch({ type: HIDE_SPINNER });
        success(translations.auth.deleted);
        AuthService.signOut();
        navigate("/");
        hideModal();
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        alert(error);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        updateUser,
        cancelEdit,
        signUpPhone,
        signInPhone,
        userLoggedIn,
        editarUsuario,
        linkUserPhone,
        getCurrentUser,
        deleteCustomer,
        recoverPassword,
        setPropertyUser,
        phoneNumberExists,
        resetAuthProvider,
        signInWithPhoneNumber,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
