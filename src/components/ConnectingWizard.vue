<template>
  <div class="wizard-window d-flex column">
    <div class="wizard-body">
      <div v-for="(step, index) of steps" :key="step.title">
        <hr class="divider" />
        <h3 class="text-left">{{ step.title }}</h3>
        <VariantCard
          v-for="variant of step.variants"
          :key="variant.title"
          :variant="variant"
          class="mb-2"
        />
        <hr v-if="index === steps.length - 1" class="divider" />
      </div>
    </div>
    <div class="wizard-footer pa-1 d-flex">
      <h2>ИТОГО К ОПЛАТЕ</h2>
      <h2 class="font-thin">{{ printPrice(totalAmount) }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VariantCard from "./VariantCard.vue";
import formatPrice from "../utils/formatPrice";

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

  methods: {
    printPrice() {
      return formatPrice(this.totalAmount);
    },
  },
});
</script>

<style scoped lang="scss">
.wizard {
  &-window {
    padding: 20px;
    max-width: 780px;
    max-height: 590px;
    overflow: hidden;
    background-color: #fff;
  }
  &-body {
    overflow: hidden;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    background-color: #5ecc5a;
    color: #fff;
  }
}

.divider {
  border: none;
  height: 2px;
  background-color: #dddddd;
}
</style>
