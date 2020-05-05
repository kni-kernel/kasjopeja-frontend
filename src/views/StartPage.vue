<template>
  <LandingPageLayout>
    <div>Start Page</div>
    <mu-button color="primary" to="/form">Go to form</mu-button>
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
