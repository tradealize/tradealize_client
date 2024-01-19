import React, { useEffect, useContext } from "react";
import Generator from "./Generator";
import { MenuContext } from "../context/MenuContext";
import useTranslations from "../hooks/useTranslations";

const TopicsGenerator = () => {
  const translations = useTranslations();
  const { setSelected } = useContext(MenuContext);

  useEffect(() => {
    setSelected("Hashtag Generator");
  }, []);
  return (
    <Generator
      base_prompt="Generate 2 to 5 trending topic ideas for "
      title={translations.topics.title}
      message_type_id={3}
    />
  );
};

export default TopicsGenerator;
