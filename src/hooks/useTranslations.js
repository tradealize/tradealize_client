import { useContext, useEffect } from "react";
import { TranslationsContext } from "../context/TranslationsContext";
import moment from "moment";
const useTranslations = () => {
  const { lang, setLang, translations } = useContext(TranslationsContext);

  useEffect(() => {
    if (lang === "es") {
      moment.locale("es", {
        monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),
        weekdaysShort: "Dom_Lun_Mar_Mie_Jue_Vie_Sab".split("_"),
        weekdays: "Lun_Mar_Mie_Jue_Vie_Sab_Dom".split("_"),
      });
    }

  }, [lang]);


  const formatDate = (date) => {
    if (lang === "en") {
      return moment(date).utc().format("MMM DD YYYY");
    }
    return moment(date).utc().format("DD MMM YYYY");
  };

  const formatDateTime = (date) => {
    if (lang === "en") {
      return moment(date).utc().format("MMM DD YYYY HH:mm");
    }
    return moment(date).utc().format("DD MMM YYYY HH:mm");
  };

  return { ...translations[lang], lang, setLang, formatDate, formatDateTime };
};

export default useTranslations;
