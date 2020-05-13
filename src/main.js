import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";

// import theme from "muse-ui/lib/theme";

Vue.use(MuseUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// theme.add(
//   "custom",
//   {
//     background: "#F3F3F3",
//     secondary: "#3E3E3E",
//     success: "#009688",
//     primary: "#080F5B"
//   },
//   "light"
// );
//
// theme.use("custom");
