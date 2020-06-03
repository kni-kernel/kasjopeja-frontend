<template>
  <LandingPageLayout>
    <h3>Wypełnij formularz. Wygeneruj PDF. Wyślij do dziekanatu.</h3>
    <mu-button color="success" to="/form">ROZPOCZNIJ</mu-button>
  </LandingPageLayout>
</template>

<script>
import LandingPageLayout from "../layouts/LandingPageLayout";

export default {
  name: "StartPage",
  components: { LandingPageLayout }
};
</script>

<style scoped></style>
