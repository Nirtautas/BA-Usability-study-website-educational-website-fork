export type ExerciseStepId =
  | "loginDefault"
  | "visitSubscriptionsPage"
  | "findCancelationMeans"
  | "addToCart"
  | "addToCartWithDiscount"
  | "addToCardKeepsBoxSubscription"
  | "addToCartCheapestKeepsBoxSubscription"
  | "userRemovedDeceptiveProduct"
  | "visitCart"
  | "visitCartHidden"
  | "visitLoginForced"
  | "visitCheckout"
  | "uncheckKeepsPlus"
  | "checkMarketingCommunications"
  | "completeCheckout"
  | "visitKeepsBox"
  | "sneakIntoBasketSelected"
  | "hiddenCostsSelected"
  | "hiddenSubscriptionSelected"
  | "limitedTimeMessageSelected"
  | "confirmshamingSelected"
  | "visualInterferenceSelected"
  | "trickQuestionsSelected"
  | "hardToCancelSelected"
  | "forcedEnrollmentSelected";

export type ExerciseStep = {
  label: string;
  visible?: boolean;
};

export type ExerciseConfiguration = {
  title: string;
  steps: ExerciseStepId[];
  completeWhen?: (completedStepIds: ExerciseStepId[]) => boolean;
  failWhen?: (completedStepIds: ExerciseStepId[]) => boolean;
  successMessage: string;
  failMessage: string;
};

export interface ExerciseContextInterface {
  exercise: ExerciseConfiguration;
  completedStepIds: ExerciseStepId[];
  visibleStepIds: ExerciseStepId[];
  completeStep: (stepId: ExerciseStepId) => void;
  uncompleteStep: (stepId: ExerciseStepId) => void;
  resetExerciseProgress: () => void;
  isStepCompleted: (stepId: ExerciseStepId) => boolean;
  isExerciseCompleted: boolean;
  isExerciseFailed: boolean;
};