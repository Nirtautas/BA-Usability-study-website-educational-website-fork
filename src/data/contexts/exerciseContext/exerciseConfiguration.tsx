import { AllowedPathFragments } from "@/data/constants";
import { ExerciseConfiguration, ExerciseStep, ExerciseStepId } from "./exerciseTypes";

export const stepDefinitions: Record<ExerciseStepId, ExerciseStep> = {
  loginDefault: {
    label: "Login into your account (email - john.doe@gmail.com, password - john1).",
    visible: true,
  },
  visitSubscriptionsPage: {
    label: "Visit your subscriptions page (press on your account in the navbar).",
    visible: true,
  },
  findCancelationMeans: {
    label: "Find how to cancel your newly acquired subscription.",
    visible: true,
  },
  addToCart: {
    label: "Add any product to your shopping cart.",
    visible: true,
  },
  addToCartWithDiscount: {
    label: "Add a discounted product to your shopping cart.",
    visible: true,
  },
  addToCardKeepsBoxSubscription: {
    label: "Add a Keeps Box subscription product to your shopping cart.",
    visible: true,
  },
  addToCartCheapestKeepsBoxSubscription: {
    label: "Add the cheapest Keeps Box subscription product to your shopping cart.",
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
  visitCartHidden: {
    label: "Go to cart.",
    visible: false,
  },
  visitCheckout: {
    label: "Go to checkout.",
    visible: true,
  },
  uncheckKeepsPlus: {
    label: "Uncheck the pre-checked 'Keeps Plus' subscription option at the end of the checkout process.",
    visible: false,
  },
  checkMarketingCommunications: {
    label: "Check the pre-unchecked marketing communications option at the end of the checkout process.",
    visible: false,
  },
  visitLoginForced: {
    label: "Go to the for,ced login page from checkout.",
    visible: false,
  },
  completeCheckout: {
    label: "Complete the checkout process (Use fake credentials if you have to).",
    visible: true,
  },
  visitKeepsBox: {
    label: "Visit the Keeps Box subscription page.",
    visible: true,
  },
  sneakIntoBasketSelected: {
    label: "Select the 'Sneak into basket' deceptive pattern with the selector tool.",
    visible: false,
  },
  hiddenCostsSelected: {
    label: "Select the 'Hidden costs' deceptive pattern with the selector tool.",
    visible: false,
  },
  hiddenSubscriptionSelected: {
    label: "Select the 'Hidden subscription' deceptive pattern with the selector tool.",
    visible: false,
  },
  limitedTimeMessageSelected: {
    label: "Select the 'Limited time message' deceptive pattern with the selector tool.",
    visible: false,
  },
  confirmshamingSelected: {
    label: "Select the 'Confirmshaming' deceptive pattern with the selector tool.",
    visible: false,
  },
  visualInterferenceSelected: {
    label: "Select the 'Visual interference' deceptive pattern with the selector tool.",
    visible: false,
  },
  trickQuestionsSelected: {
    label: "Select the 'Visual interference' deceptive pattern with the selector tool.",
    visible: false,
  },
  hardToCancelSelected: {
    label: "Select the 'Hard to cancel' deceptive pattern with the selector tool.",
    visible: false,
  },
  forcedEnrollmentSelected: {
    label: "Select the 'Forced enrollment' deceptive pattern with the selector tool.",
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
  [AllowedPathFragments.HiddenCosts]: {
    title: "Task list - Hidden costs",
    steps: ["addToCart", "visitCart", "visitCheckout", "visitLoginForced", "completeCheckout", "hiddenCostsSelected"],
    completeWhen: (completedStepIds) => completedStepIds.includes("hiddenCostsSelected"),
    failWhen: (completedStepIds) => completedStepIds.includes("visitLoginForced"),
    successMessage: 'You have successfully identified the "Hidden costs" pattern!',
    failMessage:
      'You missed the deceptive pattern. Please click on the "Restart exercise" button to try again. Pay close attention to your checkout total this time for extra costs that were not disclosed to you in the cart!',
  },
  [AllowedPathFragments.HiddenSubscription]: {
    title: "Task list - Hidden subscription",
    steps: ["addToCart", "visitCart", "visitCheckout", "visitLoginForced", "completeCheckout", "uncheckKeepsPlus", "hiddenSubscriptionSelected"],
    completeWhen: (completedStepIds) => completedStepIds.includes("uncheckKeepsPlus") || completedStepIds.includes("hiddenSubscriptionSelected"),
    failWhen: (completedStepIds) => completedStepIds.includes("visitLoginForced"),
    successMessage: 'You have successfully identified the "Hidden subscription" pattern!',
    failMessage: 'You missed the deceptive pattern. Please click on the "Restart exercise" button to try again. Pay close attention to the checkmarks at the end of the checkout process this time!',
  },
  [AllowedPathFragments.LimitedTimeMessage]: {
    title: "Task list - Limited time message",
    steps: ["addToCartWithDiscount", "visitCart", "visitCheckout", "limitedTimeMessageSelected"],
    completeWhen: (completedStepIds) => completedStepIds.includes("limitedTimeMessageSelected"),
    failWhen: (completedStepIds) => completedStepIds.includes("visitCheckout"),
    successMessage: 'You have successfully identified the "Limited time message" pattern!',
    failMessage:
      'You missed the deceptive pattern. Please click on the "Restart exercise" button to try again. Pay close attention to any time-sensitive messages during the checkout process this time!',
  },
  [AllowedPathFragments.Confirmshaming]: {
    title: "Task list - Confirmshaming",
    steps: ["addToCart", "visitCart", "visitCheckout", "confirmshamingSelected"],
    completeWhen: (completedStepIds) => completedStepIds.includes("confirmshamingSelected"),
    failWhen: (completedStepIds) => completedStepIds.includes("visitCheckout"),
    successMessage: 'You have successfully identified the "Confirmshaming" pattern!',
    failMessage:
      'You missed the deceptive pattern. Please click on the "Restart exercise" button to try again. Pay close attention to any wording that tries to guild-trip you into making a decision this time!',
  },
  [AllowedPathFragments.VisualInterference]: {
    title: "Task list - Visual interference",
    steps: ["visitKeepsBox", "addToCartCheapestKeepsBoxSubscription", "visitCheckout", "visitCartHidden", "visualInterferenceSelected"],
    completeWhen: (completedStepIds) => completedStepIds.includes("addToCartCheapestKeepsBoxSubscription") || completedStepIds.includes("visualInterferenceSelected"),
    failWhen: (completedStepIds) => completedStepIds.includes("visitCartHidden") && !completedStepIds.includes("addToCartCheapestKeepsBoxSubscription"),
    successMessage: 'You have successfully identified the "Visual interference" pattern!',
    failMessage: 'You missed the deceptive pattern. Please click on the "Restart exercise" button to try again. Pay close attention to any visual elements that might mislead you this time!',
  },
  [AllowedPathFragments.TrickQuestions]: {
    title: "Task list - Trick questions",
    steps: ["addToCart", "visitCart", "visitCheckout", "visitLoginForced", "completeCheckout", "checkMarketingCommunications", "trickQuestionsSelected"],
    completeWhen: (completedStepIds) => completedStepIds.includes("checkMarketingCommunications") || completedStepIds.includes("trickQuestionsSelected"),
    failWhen: (completedStepIds) => completedStepIds.includes("visitLoginForced"),
    successMessage: 'You have successfully identified the "Trick questions" pattern!',
    failMessage: 'You missed the deceptive pattern. Please click on the "Restart exercise" button to try again. Pay close attention to the checkmarks at the end of the checkout process this time!',
  },
  [AllowedPathFragments.HardToCancel]: {
    title: "Task list - Hard to cancel",
    steps: ["loginDefault", "visitKeepsBox", "addToCardKeepsBoxSubscription", "completeCheckout", "visitSubscriptionsPage", "findCancelationMeans", "hardToCancelSelected"],
    completeWhen: (completedStepIds) => completedStepIds.includes("hardToCancelSelected"),
    successMessage: 'You have successfully identified the "Hard to cancel" pattern!',
    failMessage: 'You missed the deceptive pattern. Please click on the "Restart exercise" button to try again. Reflect on whether you actually need to create an account to complete your purchase!',
  },
  [AllowedPathFragments.ForcedEnrollment]: {
    title: "Task list - Forced enrollment",
    steps: ["addToCart", "visitCart", "visitCheckout", "visitLoginForced", "completeCheckout", "forcedEnrollmentSelected"],
    completeWhen: (completedStepIds) => completedStepIds.includes("forcedEnrollmentSelected"),
    failWhen: (completedStepIds) => completedStepIds.includes("completeCheckout"),
    successMessage: 'You have successfully identified the "Forced enrollment" pattern!',
    failMessage: 'You missed the deceptive pattern. Please click on the "Restart exercise" button to try again. Reflect on whether you actually need to create an account to complete your purchase!',
  },
};
