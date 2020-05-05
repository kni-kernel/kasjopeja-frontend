<template>
  <div class="border">
    <mu-flex justify-content="center">
      <h1>{{ title }}</h1>
    </mu-flex>
  </div>
</template>

<script>
export default {
  name: "LeftMenuItem",
  props: {
    title: String,
    isHighlighted: Boolean
  }
};
</script>

<style scoped>
.border {
  border: black 2px solid;
}
</style>
