import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import theme from "muse-ui/lib/theme";
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";

Vue.use(MuseUI);

Vue.config.productionTip = false;

theme.add(
  "custom",
  {
    background: "#F3F3F3",
    primary: "#080F5B",
    secondary: "#2B2B2B",
    success: "#009688",
    info: "#080F5B"
  },
  "light"
);

theme.use("custom");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
