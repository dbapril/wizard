<template>
  <div class="wizard-window">
    <hr class="divider" />
    <div v-for="step of steps" :key="step.title">
      <p>{{ step.title }}</p>
      <VariantCard
        v-for="variant of step.variants"
        :key="variant.title"
        :variant="variant"
      />
    </div>
    <hr class="divider" />
    <div class="wizard-footer">
      <h2>ИТОГО К ОПЛАТЕ</h2>
      <span>{{ totalAmount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VariantCard from "./VariantCard.vue";

export default Vue.extend({
  name: "ConnectingWizard",

  props: {
    steps: {
      type: Array,
      required: true,
    },
  },

  components: { VariantCard },

  computed: {
    totalAmount() {
      return 0;
    },
  },
});
</script>

<style scoped lang="scss">
.wizard-window {
  padding: 20px;
  max-width: 780px;
  background-color: #fff;
}

.divider {
  border: none;
  height: 2px;
  /* color: rgb(216, 217, 231); */
  background-color: #dddddd;
}

.wizard-footer {
  display: flex;
  justify-content: space-between;
  background-color: #5ecc5a;
  color: #fff;
}
</style>
