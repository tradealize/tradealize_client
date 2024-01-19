export const setupColor = (key, color) => {
  document.documentElement.style.setProperty(`--${key}`, color);
  document.documentElement.style.setProperty(`--ion-color-${key}`, color);
};

export const setupTitle = (app_name, app_tagline) => {
  const title = `${app_name} | ${app_tagline}`;
  document.title = title;
};
