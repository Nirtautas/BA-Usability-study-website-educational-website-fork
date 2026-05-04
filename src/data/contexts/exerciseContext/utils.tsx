"use client";

import { useEffect } from "react";
import { useExercise } from "./exerciseContext";
import { ExerciseStepId } from "./exerciseTypes";

const useCompleteStepOnNavigation = (stepId: ExerciseStepId) => {
  const { completeStep } = useExercise();

  useEffect(() => {
    completeStep(stepId);
  }, [completeStep, stepId]);
};

export default useCompleteStepOnNavigation;
