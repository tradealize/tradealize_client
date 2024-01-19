const light = ["#f7f7f7", "#fff"];
const dark = ["#212529", "#000"];
const accent = ["#E4F1F1", "#047786"];

export const toggleDarkMode = () => {
  document.documentElement.style.setProperty("--light", dark[0]);
  document.documentElement.style.setProperty("--white", dark[1]);

  document.documentElement.style.setProperty("--body", light[0]);
  document.documentElement.style.setProperty("--dark", light[0]);
  document.documentElement.style.setProperty("--black", light[1]);
  document.documentElement.style.setProperty("--muted", light[1]);
  document.documentElement.style.setProperty("--accent-light", accent[1]);
};

export const toggleLightMode = () => {
  document.documentElement.style.setProperty("--light", light[0]);
  document.documentElement.style.setProperty("--white", light[1]);

  document.documentElement.style.setProperty("--body", dark[0]);
  document.documentElement.style.setProperty("--dark", dark[0]);
  document.documentElement.style.setProperty("--black", dark[1]);
  document.documentElement.style.setProperty("--muted", dark[1]);
  document.documentElement.style.setProperty("--accent-light", accent[0]);
};
