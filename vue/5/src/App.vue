<template lang="html">
    <div>
        <my-header></my-header>
        <my-side :name="name"></my-side>
        <my-main></my-main>
    </div>
</template>

<script>
import Header from "@/header.vue";
import Side from "@/side.vue";
import Main from "@/main.vue";

export default {
  name: "app",
  data() {
    return {name: "YYQAdmin"};
  },
  components: {
    "my-header": Header,
    "my-side": Side,
    "my-main": Main
  }
};
</script>

<style lang="css">
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.router-link-active {
  background:forestgreen;
}
</style>