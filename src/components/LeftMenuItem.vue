<template>
  <div
    :class="{
      border: true,
      noHighlighted: isHighlighted === 1,
      highlighted: isHighlighted === 0,
      noVisited: isHighlighted === -1
    }"
  >
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
    isHighlighted: Number
  }
};
</script>

<style scoped>
  .border {
    border-top: #777 1px solid;
  }
  .highlighted {
    color: #000;
    background-color: #fafafa;
  }
  .noHighlighted {
    color: #888;
  }
  .noVisited {
    color: #787878;
  }
</style>