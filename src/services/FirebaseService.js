import api from "./api";
import firebase from "firebase";
import "firebase/auth";

const FirebaseService = (firebaseConfig) => {
  firebaseConfig = JSON.parse(firebaseConfig);
  // Initialize Firebase
  if (firebase.apps.length < 1) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleSignInError = (error) => {
    throw error;
  };

  const getToken = () => auth.currentUser.getIdToken(true);

  const auth = firebase.auth();

  return {
    signIn: (email, password) =>
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          return getToken().then((token) => {
            api.defaults.headers.common["Authorization"] = token;
            return user;
          });
        })
        .catch((error) => handleSignInError(error, email, password)),
    userLoggedIn: (success, error) =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          const handleToken = () => {
            getToken().then((token) => {
              api.defaults.headers.common["Authorization"] = token;
              if (success) success(user);
            });
          };
          setInterval(handleToken, 55 * 60 * 1000);

          handleToken();
        } else {
          error();
        }
      }),
    signOut: () => auth.signOut(),
    signUp: (correo, password) =>
      auth.createUserWithEmailAndPassword(correo, password),
    recoverPassword: (email) => auth.sendPasswordResetEmail(email),
    getToken: () => auth.currentUser.getIdToken(true),
    updateEmail: (email) => auth.currentUser.updateEmail(email),
    getRecaptchaVerifier: (button_id, callback) =>
      new firebase.auth.RecaptchaVerifier(button_id, {
        size: "invisible",
        callback,
      }),
    signInWithPhoneNumber: (phone, verifier) =>
      auth.signInWithPhoneNumber(phone, verifier),
    handleToken: () =>
      getToken().then((token) => {
        api.defaults.headers.common["Authorization"] = token;
      }),
    linkPhoneNumber: (phoneNumber) =>
      auth.currentUser.linkWithPhoneNumber(phoneNumber),
    setToken: (token) => (api.defaults.headers.common["Authorization"] = token),
    setupInterceptors: (callback) => {
      api.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          const { config, message } = error;
          if (!config || !config.retry) {
            return Promise.reject(error);
          }
          // retry while Network timeout or Network Error
          if (
            !(message.includes("timeout") || message.includes("Network Error"))
          ) {
            return Promise.reject(error);
          }
          config.retry -= 1;
          if (error.response.data) {
            if (error.response.data.code) {
              if (error.response.data.code === "auth/id-token-expired") {
                return callback(error.response.data);
              }
            }
          }
          return Promise.reject(error);
        }
      );
    },
  };
};
export default FirebaseService;
