export default {
  get: {
    electiveModules: startYear => `/module/elective/${startYear}`,
    obligatoryModules: (fieldOfStudy, startYear, semester, level) =>
      `/module/${fieldOfStudy}/${startYear}/${level}/${semester}`,
    previousObligatoryModules: (fieldOfStudy, startYear, semester, level) =>
      `/module/prev/${fieldOfStudy}/${startYear}/${level}/${semester}`
  },
  post: {
    form: () => "/form"
  }
};
