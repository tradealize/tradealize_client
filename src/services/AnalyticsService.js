import api from "./api";

const route = "/analytics";

const AnalyticsService = {
  getWords: (start_date, end_date) =>
    api.get(`${route}/words?start_date=${start_date}&end_date=${end_date}`),
  getInscritos: (start_date, end_date) =>
    api.get(`${route}/customers?start_date=${start_date}&end_date=${end_date}`),
  getPurchases: (start_date, end_date) =>
    api.get(`${route}/purchases?start_date=${start_date}&end_date=${end_date}`),
  getIngresos: (start_date, end_date) =>
    api.get(`${route}/income?start_date=${start_date}&end_date=${end_date}`),
  getInstructores: (start_date, end_date) =>
    api.get(
      `${route}/instructors?start_date=${start_date}&end_date=${end_date}`
    ),
  getMensuales: (start_date, end_date) =>
    api.get(`${route}/monthly?start_date=${start_date}&end_date=${end_date}`),
  getReservaciones: (start_date, end_date) =>
    api.get(
      `${route}/reservations?start_date=${start_date}&end_date=${end_date}`
    ),
  getReporte: (start_date, end_date) =>
    api.get(
      `${route}/instructors/report?start_date=${start_date}&end_date=${end_date}`,
      {
        responseType: "blob",
      }
    ),
  getFreeTrials: (start_date, end_date) =>
    api.get(
      `${route}/free_trials?start_date=${start_date}&end_date=${end_date}`
    ),
  getVideos: (start_date, end_date) =>
    api.get(`${route}/videos?start_date=${start_date}&end_date=${end_date}`),
};

export default AnalyticsService;
