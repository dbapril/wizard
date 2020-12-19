<template>
  <div class="wizard-window">
    <hr class="divider" />
    <hr class="divider" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConnectingWizard",
  props: {
    steps: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.wizard-window {
  padding: 20px;
  background-color: #fff;
}

.divider {
  height: 2px;
  color: rgb(160, 161, 179);
}
</style>
