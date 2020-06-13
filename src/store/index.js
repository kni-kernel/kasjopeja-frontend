import Vue from "vue";
import Vuex from "vuex";

import form from "./form.module";
import subjects from "./subjects.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    form,
    subjects
  }
});
