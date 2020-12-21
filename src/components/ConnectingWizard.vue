<template>
  <div class="wizard-window d-flex column">
    <div class="wizard-body">
      <hr class="divider mt-0" />
      <h3 class="text-left">{{ currentStep.title }}</h3>
      <ConnectingStep
        v-if="currentStepIsSet"
        :step="currentStep"
        :key="currentStep.stepId"
        @step-variant-chosen="chooseStepVariant"
      />
    </div>
    <div class="wizard-footer pa-1 d-flex">
      <h2>ИТОГО К ОПЛАТЕ</h2>
      <h2 class="font-thin">{{ printPrice(totalAmount) }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import formatPrice from "../utils/formatPrice";
import ConnectingStep from "./ConnectingStep.vue";
import {
  IConnectingStep,
  IConnectingStepForChoose,
  IVariantForChoose,
} from "../types";

export default Vue.extend({
  name: "ConnectingWizard",

  props: {
    steps: {
      type: Array as () => Array<IConnectingStep>,
      required: true,
    },
  },

  components: { ConnectingStep },

  data() {
    return {
      chosenVariants: [] as Array<IVariantForChoose>,
      currentStep: {} as IConnectingStepForChoose,
    };
  },

  computed: {
    totalAmount(): number {
      return this.chosenVariants
        .filter((variant) => variant.isChosen)
        .map((variant) => variant.totalPrice)
        .reduce((prevPrice, nextPrice) => prevPrice + nextPrice, 0);
    },
    stepsForChoose(): Array<IConnectingStepForChoose> {
      return this.steps.map((step, index) => ({ stepId: index, ...step }));
    },
    currentStepIsSet(): boolean {
      return !!Object.entries(this.currentStep).length;
    },
  },

  mounted() {
    this.currentStep = this.stepsForChoose[0];
  },

  methods: {
    printPrice() {
      return formatPrice(this.totalAmount);
    },
    chooseStepVariant(theVariant: IVariantForChoose) {
      const index = this.chosenVariants.findIndex(
        (variant) => variant.stepId === theVariant.stepId,
      );
      if (index) {
        this.$set(this.chosenVariants, index, theVariant);
      } else {
        this.chosenVariants = [...this.chosenVariants, theVariant];
      }

      this.setCurrentStep(theVariant.stepId);
    },
    setCurrentStep(stepId: number) {
      const nextStepIndex =
        this.stepsForChoose.findIndex((step) => step.stepId === stepId) + 1;
      if (this.stepsForChoose[nextStepIndex]) {
        this.currentStep = this.stepsForChoose[nextStepIndex];
      }
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
    overflow-y: auto;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    background-color: #5ecc5a;
    color: #fff;
  }
}
</style>
