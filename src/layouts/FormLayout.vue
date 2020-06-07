<template>
  <mu-container fluid class="form-container">
    <mu-row>
      <mu-col class="left-menu" span="2">
        <LeftMenu class="nav" :step="step" />
      </mu-col>
      <mu-col span="10">
        <mu-row>
          <mu-col span="12">
            <div class="title-container">
              <h1>{{ title }}</h1>
              <h3>{{ subtitle }}</h3>
            </div>
          </mu-col>
        </mu-row>
        <mu-row>
            <mu-col span="10">
                <slot />
                <mu-button color="primary" class="button" @click="handleButtonClick"
                >DALEJ</mu-button
                >
            </mu-col>
          <mu-col span="2">
            <div class="progress-container">
              <mu-circular-progress
                mode="determinate"
                :value="percentage"
                color="#080F5B"
                :stroke-width="40"
                :size="200"
                class="progress"
              />
              <h1>{{ percentage }}%</h1>
            </div>
          </mu-col>
        </mu-row>
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
import LeftMenu from "../components/LeftMenu";

export default {
  name: "FormLayout",
  components: { LeftMenu },
  props: {
    step: Number,
    title: String,
    subtitle: String,
    percentage: Number
  },
  methods: {
    handleButtonClick: function() {
      this.$parent.$emit("changeFormPage");
    }
  }
};
</script>

<style scoped>
  .form-container {
    padding: 0;
    height: 100vh;
  }
  .progress {
    transform: rotateY(0deg) rotate(-90deg);
  }
  .progress-container {
    padding: 4em 2em 0 0;
    position: fixed;
    width: 72px;
    height: 72px;
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
    padding-button: 3em;
    border-top: #009688 solid 3.3px;
    text-align: justify;
    font-weight: lighter;
  }
  .button {
    left:50vw;
    margin-bottom: 30px;
  }
  .left-menu {
    possition: sticky;
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
      left:1vw
    }
  }

  @media only screen and (max-width: 1200px) {
    .progress-container {
      display:none;
    }
  }
</style>
