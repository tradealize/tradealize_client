import { SET_CONFIG, SET_SINGLE_CONFIG } from "../types/appconfig";

const AppConfigReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_SINGLE_CONFIG: {
      const { key, value } = payload;
      return { ...state, [key]: value };
    }
    case SET_CONFIG:
      let config = {};
      if (Array.isArray(payload)) {
        let params = payload;
        params.forEach(({ key, value }) => {
          if (key === "firebaseConfig") {
            value = JSON.parse(value);
          }
          config[key] = value;
        });

        if (!config.S3_ENDPOINT) {
          let S3_ENDPOINT = `https://${config.bucket}.s3.${config.region}.amazonaws.com`;
          config.S3_ENDPOINT = S3_ENDPOINT;
        }
      }
      return { ...state, ...config };
    default:
      return { ...state };
  }
};
export default AppConfigReducer;
