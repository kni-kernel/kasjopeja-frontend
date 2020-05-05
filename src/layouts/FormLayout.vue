<template>
  <mu-container fluid class="form-container">
    <mu-row>
      <mu-col span="2">
        <LeftMenu :step="step" />
      </mu-col>
      <mu-col span="8">
        <h1>{{ title }}</h1>
        <slot />
        <mu-button color="primary" @click="handleButtonClick">DALEJ</mu-button>
      </mu-col>
      <mu-col span="2">
        <div class="progress-container">
          <mu-circular-progress
            v-if="percentage > 0"
            mode="determinate"
            :value="percentage"
            color="secondary"
            :stroke-width="5"
            :size="72"
            class="progress"
          />
        </div>
        <h1>{{ percentage }}%</h1>
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
import LeftMenu from "../components/LeftMenu";
/**
 * W tym komponencie chcemy mieć ogólny layout formularza tj:
 *  Lewy panel boczny, Nagłówek (który teksty bierze z propsów), miejsce na content oraz pasek postępu
 * Mniej więcej starałem się Wam pokazać tutaj jak to ogarnąć z VueMaterial
 */
export default {
  name: "FormLayout",
  components: { LeftMenu },
  props: {
    step: Number,
    title: String,
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
  width: 72px;
  height: 72px;
}
</style>
