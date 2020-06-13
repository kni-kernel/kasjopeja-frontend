import {
  getElectiveModules,
  getObligatoryModules,
  getPreviousObligatoryModules
} from "../api";

const initialState = () => ({
  obligatorySubjects: [],
  electiveSubjects: [],
  previousObligatorySubjects: []
});

const state = initialState();

const actions = {
  async getObligatorySubjects(
    { commit },
    { fieldOfStudy, startYear, semester, level }
  ) {
    try {
      const obligatoryModules = await getObligatoryModules(
        fieldOfStudy,
        startYear,
        semester,
        level
      );
      commit("setObligatorySubjects", obligatoryModules.data);
    } catch (err) {
      console.error(err);
    }
  },

  async getElectiveSubjects({ commit }, { startYear }) {
    try {
      const electiveModules = await getElectiveModules(startYear);
      commit("setElectiveSubjects", electiveModules.data);
    } catch (err) {
      console.error(err);
    }
  },

  async getPreviousObligatorySubjects(
    { commit },
    { fieldOfStudy, startYear, semester, level }
  ) {
    try {
      const previousObligatoryModules = await getPreviousObligatoryModules(
        fieldOfStudy,
        startYear,
        semester,
        level
      );
      commit("setPreviousObligatorySubjects", previousObligatoryModules.data);
    } catch (err) {
      console.error(err);
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
  setObligatorySubjects(state, subjects) {
    state.obligatorySubjects = subjects;
  },
  setElectiveSubjects(state, subjects) {
    state.electiveSubjects = subjects;
  },
  setPreviousObligatorySubjects(state, subjects) {
    state.previousObligatorySubjects = subjects;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
