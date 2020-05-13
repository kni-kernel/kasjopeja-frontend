<template>
  <mu-container>
    <h1>LandingPageLayout</h1>
    <slot />
  </mu-container>
</template>

<script>
/**
 * W tym komponencie chcemy dodać trójkąty, białe tło, ikonki w lewym dolnym rogu
 * Komponent będzie przyjmować inny komponent (jako "dziecko")
 * Ten inny komponent w zależności od strony będzie zawierać informację z startPage lub endPage
 */
export default {
  name: "LandingPageLayout"
};
</script>

<style scoped></style>
