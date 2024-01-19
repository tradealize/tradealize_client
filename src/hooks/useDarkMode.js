import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toggleDarkMode, toggleLightMode } from "../utils/darkmode";

const useDarkMode = () => {
  const { user, updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      if (user.dark_mode) {
        toggleDarkMode();
      } else {
        toggleLightMode();
      }
    }
  }, [user]);

  const setDarkMode = (darkMode) => {
    updateUser({ ...user, dark_mode: darkMode }, null, true);
  };

  return [user !== null ? user.dark_mode : false, setDarkMode];
};

export default useDarkMode;
