import { getValue } from ".";

export const getTools = (appconfig) => {
  const tabs = [];
  if (getValue(appconfig, "hashtags_enabled", "boolean")) {
    tabs.push({
      link: "/hashtags",
      name: { en: "Hashtags", es: "Hashtags" },
      icon: "fa fa-hashtag me-2",
    });
  }
  if (getValue(appconfig, "topics_enabled", "boolean")) {
    tabs.push({
      link: "/topics",
      name: { en: "Topics", es: "Temas" },
      icon: "fa fa-lightbulb me-2",
    });
  }
  if (getValue(appconfig, "chatwidget_enabled", "boolean")) {
    tabs.push({
      link: "/chat-widget-generator",
      name: { en: "Chat Widget", es: "Chat Widget" },
      icon: "fa fa-comment me-2",
    });
  }
  return tabs;
};

export const getTabs = (appconfig) => {
  const tabs = [];
  if (getValue(appconfig, "avatars_enabled", "boolean")) {
    tabs.push({
      link: "/avatars",
      name: { en: "Avatars", es: "Avatares" },
      icon: "fa fa-users me-2",
    });
  }
  if (getValue(appconfig, "super_fetch", "boolean")) {
    tabs.push({
      link: "/super-fetch",
      name: { en: "Super Fetch", es: "Super Fetch" },
      icon: "fa fa-bolt me-2",
    });
  }
  if (getValue(appconfig, "templates_enabled", "boolean")) {
    tabs.push({
      link: "/templates",
      name: { en: "Templates", es: "Plantillas" },
      icon: "fa fa-shapes me-2",
    });
  }
  return tabs;
};
