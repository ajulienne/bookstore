import React from "react";
import { useTranslation } from "react-i18next";

export const SwitchLang = (props) => {
  const { i18n } = useTranslation();

  const switchLang = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("fr");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return <button onClick={switchLang}>{i18n.language.toUpperCase()}</button>;
};
