export type ExerciseStepId =
  | "addToCart"
  | "userRemovedDeceptiveProduct"
  | "visitCart"
  | "visitCheckout"
  | "completeCheckout";

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

export type ExerciseContextValue = {
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