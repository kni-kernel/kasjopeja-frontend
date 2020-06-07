<template>
  <div class="left-menu h-100">
    <mu-flex justify-content="center">
      <img alt="Logo AGH" src="../assets/agh_logo.svg" />
    </mu-flex>
    <div class="left-menu-content">
      <LeftMenuItem
        title="Dane podstawowe"
        :is-highlighted="step === 1 ? 0 : step > 1 ? 1 : -1"
      />
      <LeftMenuItem
        title="Przedmioty stanowiące deficyt ECTS"
        :is-highlighted="step === 2 ? 0 : step > 2 ? 1 : -1"
      />
      <LeftMenuItem
        title="Przedmioty zrealizowane w semestrach poprzednich"
        :is-highlighted="step === 3 ? 0 : step > 3 ? 1 : -1"
      />
      <LeftMenuItem
        title="Przedmioty obowiązkowe"
        :is-highlighted="step === 4 ? 0 : step > 4 ? 1 : -1"
      />
      <LeftMenuItem
        title="Przedmioty obieralne"
        :is-highlighted="step === 5 ? 0 : step > 5 ? 1 : -1"
      />
      <LeftMenuItem
        title="Przedmioty dodatkowe"
        :is-highlighted="step === 6 ? 0 : step > 6 ? 1 : -1"
      />
      <LeftMenuItem
        title="Przedmioty powtarzane"
        :is-highlighted="step === 7 ? 0 : step > 7 ? 1 : -1"
      />
    </div>
  </div>
</template>

<script>
import LeftMenuItem from "./LeftMenuItem";
export default {
  name: "LeftMenu",
  components: { LeftMenuItem },
  props: {
    step: Number
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style scoped>
  .left-menu {
    top: 0;
    bottom: 0;
    position: sticky;
    min-height: 50em;
    font-family: "Roboto", sans-serif;
    background-color: #3f3f3f;
    font-size: 0.7em;
    text-align: center;
    font-style: normal;
    font-weight: normal;
  }
  .left-menu h1 {
    color: black;
    font-size: 2.5em;
    padding-top: 0;
  }
  .left-menu-content {
    border-bottom: #777 1px solid;
    position: sticky;

  }

</style>
