<template>
  <mu-container fluid class="form-container">
    <mu-row>
      <mu-col class="left-menu" sm="0" md="2">
        <LeftMenu class="nav" :step="step" />
      </mu-col>
      <mu-col sm="12" md="10">
        <div class="title-container">
          <mu-row>
            <mu-col span="12">
              <div class="title-container">
                <h1>{{ title }}</h1>
                <h3>{{ subtitle }}</h3>
              </div>
            </mu-col>
          </mu-row>
          <mu-row>
            <mu-col span="12">
              <slot />
              <mu-button
                color="primary"
                class="button"
                @click="handleButtonClick"
                >DALEJ</mu-button
              >
            </mu-col>
          </mu-row>
        </div>
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
import LeftMenu from "../components/LeftMenu";

import { EventBus } from "../utils/EventBus";

export default {
  name: "FormLayout",
  components: { LeftMenu },
  props: {
    step: Number,
    title: String,
    subtitle: String
  },
  methods: {
    handleButtonClick: function() {
      EventBus.$emit("clickButtonChangeFormPage", this.step);
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 0;
  height: 100vh;
}
.progress-container h1 {
  text-align: center;
  margin-left: 1.5em;
  padding: 0.2em;
  font-size: 3em;
}
.title-container {
  padding: 0 2.5em 0 2.5em;
}
.title-container h1 {
  font-size: 3.5em;
  font-weight: lighter;
  margin-bottom: 0;
}
.title-container h3 {
  padding-top: 1em;
  padding-bottom: 3em;
  border-top: #009688 solid 3.3px;
  text-align: justify;
  font-weight: lighter;
}
.button {
  left: 50vw;
  margin-bottom: 30px;
}
.left-menu {
  position: sticky;
  top: 0;
}
@media only screen and (max-width: 1000px) {
  .left-menu {
    display: none;
  }
  .title-container h1 {
    font-size: 2em;
  }
  .button {
    left: 1vw;
  }
}
</style>
