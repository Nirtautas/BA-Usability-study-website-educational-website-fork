"use client";

import { useEffect } from "react";
import { stepDefinitions } from "./exerciseConfiguration";
import { useExercise } from "./exerciseContext";
import { ExerciseStepId } from "./exerciseTypes";

const useCompleteStepOnNavigation = (stepId: ExerciseStepId, enabled = true) => {
  const { completeStep } = useExercise();

  useEffect(() => {
    if (!enabled) return;

    completeStep(stepId);
  }, [enabled, stepId, completeStep]);
};

const isExerciseStepId = (value: string): value is ExerciseStepId => {
  return value in stepDefinitions;
};

export { isExerciseStepId, useCompleteStepOnNavigation };
