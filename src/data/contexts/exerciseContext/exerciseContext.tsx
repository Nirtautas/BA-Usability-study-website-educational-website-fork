"use client";

import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { useParams } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";
import { exerciseConfigs, stepDefinitions } from "./exerciseConfiguration";
import { ExerciseContextInterface, ExerciseStepId } from "./exerciseTypes";

const ExerciseContext = createContext<ExerciseContextInterface | undefined>(undefined);

const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const exercise = exerciseConfigs[params.uniquePathFragment] ?? exerciseConfigs.default;

  const isStepVisible = (stepId: ExerciseStepId) => stepDefinitions[stepId]?.visible !== false;

  const [completedStepIds, setCompletedStepIds] = useState<ExerciseStepId[]>([]);
  const visibleStepIds = exercise.steps.filter((stepId) => isStepVisible(stepId));

  const completeStep = (stepId: ExerciseStepId) => {
    setCompletedStepIds((previous) => {
      if (previous.includes(stepId)) return previous;

      if (!isStepVisible(stepId)) {
        return [...previous, stepId];
      }

      const firstIncompleteVisibleStep = visibleStepIds.find((visibleStepId) => !previous.includes(visibleStepId));

      if (stepId !== firstIncompleteVisibleStep) {
        return previous;
      }

      return [...previous, stepId];
    });
  };

  const uncompleteStep = (stepId: ExerciseStepId) => {
    setCompletedStepIds((previous) => previous.filter((completedStepId) => completedStepId !== stepId));
  };

  const resetExerciseProgress = () => {
    setCompletedStepIds([]);
  };

  const isStepCompleted = (stepId: ExerciseStepId) => completedStepIds.includes(stepId);
  const isExerciseCompleted = exercise.completeWhen ? exercise.completeWhen(completedStepIds) : visibleStepIds.every((stepId) => completedStepIds.includes(stepId));
  const isExerciseFailed = exercise.failWhen ? exercise.failWhen(completedStepIds) : false;

  const value: ExerciseContextInterface = {
    exercise,
    completedStepIds,
    visibleStepIds,
    completeStep,
    uncompleteStep,
    resetExerciseProgress,
    isStepCompleted,
    isExerciseCompleted,
    isExerciseFailed,
  };

  return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
};

const useExercise = () => {
  const context = useContext(ExerciseContext);

  if (!context) {
    throw new Error("useExercise must be used inside ExerciseProvider");
  }

  return context;
};

export { ExerciseProvider, useExercise };
