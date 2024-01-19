import moment from "moment";
import { parse } from "query-string";
import { navigate } from "@reach/router";

const handleLocalStorage = (callback) => {
  const uid = window.localStorage.getItem("uid");
  if (uid && uid !== null) {
    const expiration = window.localStorage.getItem("uid_expiration");
    if (moment(expiration).isBefore(moment())) {
      window.localStorage.removeItem("uid");
      window.localStorage.removeItem("uid_expiration");
    } else {
      if (typeof callback === "function") {
        callback(uid);
      }
    }
    if (!window.location.pathname.includes('/chat-embedded')) {
      navigate("/");
    }
  }
};

export const handleURLParams = (callback) => {
  const searchParams = parse(window.location.search);
  if (searchParams.uid) {
    window.localStorage.setItem("uid", searchParams.uid);
    window.localStorage.setItem(
      "uid_expiration",
      moment().add(5, "minutes").format("YYYY-MM-DD HH:mm")
    );
  }
  handleLocalStorage(callback);
};
