import { postForm } from "../api";

const initialState = () => ({
  album: null,
  email: "",
  fieldOfStudy: "",
  firstName: "",
  lastName: "",
  semester: null,
  studyDegree: null,
  studyYear: "",
  actualYear: "",
  deficitSubjects: [],
  regularSubjects: [],
  electiveSubjects: [],
  additionalSubjects: [],
  previousSemesterSubjects: [],
  noAttendence: []
});

const state = initialState();

const actions = {
  setPersonalData({ commit }, personalData) {
    commit("setPersonalData", personalData);
  },

  setSubjectsData({ commit }, subjectsData) {
    commit("setSubjectsData", subjectsData);
  },

  async generateSpz({ state }) {
    try {
      const payload = {
        ...state,
        studyYear: state.actualYear
      };
      return (await postForm(payload)).data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};

const mutations = {
  reset(state) {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  },

  setPersonalData(
    state,
    {
      album,
      email,
      fieldOfStudy,
      firstName,
      lastName,
      semester,
      studyDegree,
      studyYear,
      actualYear
    }
  ) {
    state.album = album;
    state.email = email;
    state.fieldOfStudy = fieldOfStudy;
    state.firstName = firstName;
    state.lastName = lastName;
    state.semester = semester;
    state.studyDegree = studyDegree;
    state.studyYear = studyYear;
    state.actualYear = actualYear;
  },

  setSubjectsData(state, { key, subjectsArray }) {
    if (
      ![
        "deficitSubjects",
        "regularSubjects",
        "electiveSubjects",
        "additionalSubjects",
        "previousSemesterSubjects",
        "noAttendence"
      ].includes(key)
    )
      return;
    state[key] = subjectsArray;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
