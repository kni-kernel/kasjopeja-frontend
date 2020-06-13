<template>
  <LandingPageLayout>
    <h2>Wygenerowany Semestralny Plan Zajęć zaraz zacznie się pobierać...</h2>
    <a href="/" v-if="!loading">
      <mu-button color="success">Powrót do strony głównej</mu-button>
    </a>
  </LandingPageLayout>
</template>

<script>
import { mapActions } from "vuex";

import LandingPageLayout from "../layouts/LandingPageLayout";

export default {
  name: "FinalPage",
  components: { LandingPageLayout },
  data() {
    return {
      loading: true
    };
  },
  async mounted() {
    const response = await this.generateSpz();
    console.log("resp", response);
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "SPZ.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.loading = false;
  },
  methods: {
    ...mapActions("form", ["generateSpz"])
  }
};
</script>
