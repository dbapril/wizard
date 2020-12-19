<template>
  <div id="app">
    <ConnectingWizard v-if="connectingData.length" :steps="connectingData" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ConnectingWizard from "./components/ConnectingWizard.vue";
import jsonData from "@/data.json";

export default Vue.extend({
  name: "App",

  components: {
    ConnectingWizard,
  },

  data() {
    return {};
  },

  computed: {
    connectingData() {
      return jsonData ?? [];
    },
  },
});
</script>

<style lang="scss">
@import url("./assets/scss/main.scss");
</style>
