import axios from "./axiosWrapper";
import endpoints from "./endpoints";

export function getElectiveModules(startYear) {
  return axios.get(endpoints.get.electiveModules(startYear));
}

export function getObligatoryModules(fieldOfStudy, startYear, semester, level) {
  return axios.get(
    endpoints.get.obligatoryModules(fieldOfStudy, startYear, semester, level)
  );
}

export function getPreviousObligatoryModules(
  fieldOfStudy,
  startYear,
  semester,
  level
) {
  return axios.get(
    endpoints.get.previousObligatoryModules(
      fieldOfStudy,
      startYear,
      semester,
      level
    )
  );
}

export function postForm(formData) {
  return axios.post(endpoints.post.form(), formData, { responseType: "blob" });
}
