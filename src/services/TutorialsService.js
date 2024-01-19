import api from "./api";

const route = "/tutorials";

const TutorialsService = {
  getTutorials: () => api.get(route),
  getSingleTutorial: (tutorial_id) => api.get(`${route}/${tutorial_id}`),
};
export default TutorialsService;
