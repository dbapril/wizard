<template>
  <div class="variant-card" :style="{ 'border-color': variant.color }">
    <div class="d-flex justify-space-between">
      <h4>{{ variant.title }}</h4>
      <p>{{ variant.price_default }}</p>
    </div>
    <div class="d-flex justify-space-between">
      <div class="description-section">
        <p
          v-for="(description, index) of variantDescriptions"
          :key="index"
          class="text-left"
        >
          {{ description }}
        </p>
      </div>
      <div>
        <div v-for="option of variant.options" :key="option.title">
          <input type="checkbox" />
          <span>{{ option.title }}</span>
        </div>
        <button type="button">Выбрать</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IVariant } from "../types";

interface BorderStyle {
  ["border-left"]: string;
}

export default Vue.extend({
  name: "VariantCard",

  props: {
    variant: {
      type: Object as () => IVariant,
      required: true,
    },
  },

  computed: {
    variantDescriptions() {
      return this.variant.description.split("\n");
    },
  },
});
</script>

<style lang="scss" scoped>
.variant-card {
  padding: 10px;
  border-left: 5px solid;
  background-color: #f8f8f8;
}

.description-section {
  padding-right: 10px;
  border-right: 1px solid #dddddd;
  width: 70%;
}
</style>
