import React, { useContext } from "react";
import useTranslations from "../../hooks/useTranslations";
import { AuthContext } from "../../context/AuthContext";

const ToggleLanguage = () => {
  const { updateUser, user, getCurrentUser } = useContext(AuthContext);
  const { lang, setLang } = useTranslations();

  const handleLangChange = (e) => {
    const selectedLang = e.target.value;

    updateUser({ ...user, lang: selectedLang }, getCurrentUser, true);

    setLang(selectedLang);
  };

  return (
    <select
      value={lang}
      onChange={handleLangChange}
      className="form-control text-center"
    >
      <option value="en">EN - English</option>
      <option value="es">ES - Español</option>
    </select>
  );
};

export default ToggleLanguage;
