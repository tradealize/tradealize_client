import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toggleDarkMode } from "../utils/darkmode";

const useDarkMode = () => {
  const { user, updateUser } = useContext(AuthContext);

  useEffect(() => {
    toggleDarkMode();
  }, [user]);

  const setDarkMode = (darkMode) => {
    updateUser({ ...user, dark_mode: darkMode }, null, true);
  };

  return [true, setDarkMode];
};

export default useDarkMode;
