import api from "./api";

const route = "/appconfig";

const AppConfigService = {
  getAppConfig: () => api.get(route),
  putAppconfig: (key, value) => api.put(route, { key, value }),
};

export default AppConfigService;
