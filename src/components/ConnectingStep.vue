<template>
  <div>
    <VariantCard
      v-for="variant of variantsForChoose"
      :key="variant.id"
      :variant="variant"
      class="mb-2"
      @variant-chosen="chooseVariant($event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IConnectingStepForChoose, IVariantForChoose } from "../types";
import VariantCard from "./VariantCard.vue";

export default Vue.extend({
  name: "ConnectingStep",

  components: { VariantCard },

  props: {
    step: {
      type: Object as () => IConnectingStepForChoose,
      required: true,
    },
  },

  data() {
    return {
      variants: [] as Array<IVariantForChoose>,
      chosenVariant: {},
    };
  },

  computed: {
    variantsForChoose: {
      get(): Array<IVariantForChoose> {
        return this.variants;
      },
      set(payload: Array<IVariantForChoose>) {
        this.variants = payload;
      },
    },
  },

  mounted() {
    this.variantsForChoose = this.step.variants.map((variant, index) => ({
      isChosen: false,
      id: index,
      totalPrice: 0,
      stepId: this.step.stepId,
      ...variant,
    }));
  },

  methods: {
    chooseVariant(theVariant: IVariantForChoose) {
      if (theVariant.isChosen) {
        this.variantsForChoose.forEach((variant) => (variant.isChosen = false));
      }

      const index = this.variantsForChoose.findIndex(
        (variant) => variant.id === theVariant.id,
      );
      this.$set(this.variantsForChoose, index, theVariant);

      this.$emit("step-variant-chosen", theVariant);
    },
  },
});
</script>
