<template>
  <div class="variant-card" :style="{ 'border-color': variant.color }">
    <div class="d-flex justify-space-between mb-1">
      <h4 class="my-1">{{ variant.title }}</h4>
      <p class="my-1">{{ printPrice(totalVariantPrice) }}</p>
    </div>
    <div class="d-flex justify-space-between">
      <div class="description-section mr-1">
        <p
          v-for="(description, index) of variantDescriptions"
          :key="index"
          class="text-left mt-0"
        >
          {{ description }}
        </p>
      </div>
      <form ref="form" class="choosing-section">
        <div
          v-for="option of variant.options"
          :key="option.title"
          class="option-box mb-2 pa-1"
        >
          <input
            v-model="chosenOptions"
            :value="option"
            :disabled="variant.isChosen"
            type="checkbox"
            class="float-left"
          />
          <span>{{ option.title }}</span>
        </div>
        <div v-for="selectItem of variant.select" :key="selectItem.title">
          <span class="caption d-block mb-1">{{ selectItem.title }}</span>
          <div class="mb-2">
            <select
              v-model="chosenSelectItem"
              :disabled="variant.isChosen"
              ref="select"
              class="select-box"
              required
            >
              <option
                v-for="option of selectItem.items"
                :key="option.title"
                :value="option"
              >
                {{ option.title }}
              </option>
            </select>
            <div class="relative">
              <span
                v-show="selectError"
                class="pa-1 caption text-error absolute error-tip"
                >{{ selectError }}</span
              >
            </div>
          </div>
        </div>
        <button
          :class="variant.isChosen ? 'is-chosen' : 'not-chosen'"
          class="btn btn-block"
          @click.prevent="chooseVariant(variant)"
        >
          {{ variant.isChosen ? "Выбрано" : "Выбрать" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IVariantForChoose, IOption } from "../types";
import formatPrice from "../utils/formatPrice";

export default Vue.extend({
  name: "VariantCard",

  props: {
    variant: {
      type: Object as () => IVariantForChoose,
      required: true,
    },
  },

  data() {
    return {
      chosenOptions: [] as Array<IOption>,
      chosenSelectItem: {} as IOption,
      selectError: "",
    };
  },

  computed: {
    variantDescriptions() {
      return this.variant.description.split("\n");
    },
    totalVariantPrice(): number {
      if (!this.chosenOptions.length && !this.chosenSelectItem?.price) {
        return this.variant.price_default;
      }

      const optionsTotalPrice = this.chosenOptions
        .map((option) => option.price)
        .reduce((prevPrice, currPrice) => {
          return prevPrice + currPrice;
        }, 0);
      const selectedItemPrice = this.chosenSelectItem?.price ?? 0;

      return optionsTotalPrice + selectedItemPrice;
    },
  },

  methods: {
    printPrice(price: number): string {
      return formatPrice(price);
    },
    chooseVariant(variant: IVariantForChoose) {
      if (!this.validate()) return;

      this.$emit("variant-chosen", {
        ...variant,
        isChosen: !variant.isChosen,
        totalPrice: this.totalVariantPrice,
      });
    },
    validate() {
      if (
        this.variant.select.length &&
        !Object.entries(this.chosenSelectItem).length
      ) {
        this.reportError();
        return false;
      }
      return true;
    },
    reportError() {
      this.selectError = "Выберите одно из значений";
      setTimeout(() => (this.selectError = ""), 2000);
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

.choosing-section {
  width: 30%;
}

.option-box {
  border: 1px solid gray;
}

.select-box {
  display: block;
  width: 100%;
  background-color: #fff;
  padding: 0.5rem;
}

.caption {
  font-size: 0.8rem;
}

.not-chosen {
  background-color: #99abba;
}

.is-chosen {
  background-color: #2fcb5a;
}

.error-tip {
  display: block;
  box-sizing: border-box;
  border: 1px solid red;
  width: 100%;
  background: #fff;
}
</style>
