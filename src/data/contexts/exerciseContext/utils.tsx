"use client";

import { useEffect } from "react";
import { stepDefinitions } from "./exerciseConfiguration";
import { useExercise } from "./exerciseContext";
import { ExerciseStepId } from "./exerciseTypes";

const useCompleteStepOnNavigation = (stepId: ExerciseStepId) => {
  const { completeStep } = useExercise();

  useEffect(() => {
    completeStep(stepId);
  }, [completeStep, stepId]);
};

const isExerciseStepId = (value: string): value is ExerciseStepId => {
  return value in stepDefinitions;
};

export { isExerciseStepId, useCompleteStepOnNavigation };
