<template>
  <div class="left-menu h-100">
    <mu-flex justify-content="center">
      <h1>AGH LOGO</h1>
    </mu-flex>
    <div>
      <LeftMenuItem title="Test" :is-highlihted="false" />
      <LeftMenuItem title="Test2" :is-highlihted="false" />
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
  }
};
</script>

<style scoped>
.left-menu {
  background-color: #c0c0c0;
}
</style>
