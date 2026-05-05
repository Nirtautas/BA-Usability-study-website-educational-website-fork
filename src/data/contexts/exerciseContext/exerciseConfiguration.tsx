import { AllowedPathFragments } from "@/data/constants";
import { ExerciseConfiguration, ExerciseStep, ExerciseStepId } from "./exerciseTypes";

export const stepDefinitions: Record<ExerciseStepId, ExerciseStep> = {
  addToCart: {
    label: "Add any product to your shopping cart.",
    visible: true,
  },
  userRemovedDeceptiveProduct: {
    label: "Remove the deceptive product from your shopping cart.",
    visible: false,
  },
  visitCart: {
    label: "Go to cart.",
    visible: true,
  },
  visitCheckout: {
    label: "Go to checkout.",
    visible: true,
  },
  completeCheckout: {
    label: "Complete the checkout process (Use fake credentials if you have to).",
    visible: true,
  },
  sneakIntoBasketSelected: {
    label: "Select the 'Sneak into basket' deceptive pattern with the selector tool.",
    visible: false,
  },
};

export const exerciseConfigs: Record<string, ExerciseConfiguration> = {
  default: {
    title: "Error! No exercise found for this path.",
    steps: [],
    completeWhen: () => false,
    failWhen: () => false,
    successMessage: "Error! No exercise found for this path.",
    failMessage: "Error! No exercise found for this path.",
  },
  [AllowedPathFragments.SneakIntoBasket]: {
    title: "Task list - Sneak into the basket",
    steps: ["addToCart", "visitCart", "visitCheckout", "completeCheckout", "userRemovedDeceptiveProduct", "sneakIntoBasketSelected"],
    completeWhen: (completedStepIds) => completedStepIds.includes("userRemovedDeceptiveProduct") || completedStepIds.includes("sneakIntoBasketSelected"),
    failWhen: (completedStepIds) => completedStepIds.includes("visitCheckout"),
    successMessage: 'You have successfully identified the "Sneak into the basket" pattern!',
    failMessage: 'You missed the deceptive pattern. Please click on the "Restart exercise" button to try again. Pay close attention to your cart items this time!',
  },
};
