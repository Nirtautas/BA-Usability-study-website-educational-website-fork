"use client";

import { useExercise } from "@/data/contexts/exerciseContext/exerciseContext";
import { isExerciseStepId } from "@/data/contexts/exerciseContext/utils";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useElementInspector } from "./elementInspectorContext";

const ElementInspector = () => {
  const { completeStep } = useExercise();
  const { inspectMode, setInspectMode } = useElementInspector();
  const [inspectTarget, setInspectTarget] = useState<HTMLElement | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<HTMLElement | null>(null);
  const inspectTargetRef = useRef<HTMLElement | null>(null);
  const [inspectRect, setInspectRect] = useState<DOMRect | null>(null);
  const ELEMENT_INSPECTOR_CONTAINER = "element-inspector-container";
  const EXERCISE_STEP_ATTRIBUTE = "exercise-step";

  useEffect(() => {
    if (!inspectMode) {
      setInspectTarget(null);
      setSelectedTarget(null);
      return;
    }

    const getValidTopElement = (event: MouseEvent): HTMLElement | null => {
      const topElement = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
      if (!topElement) return null;

      const inspectorContainer = document.querySelector(`[${ELEMENT_INSPECTOR_CONTAINER}]`);
      if (inspectorContainer?.contains(topElement)) return null;

      return topElement;
    };

    const onMouseMove = (event: MouseEvent) => {
      const topElement = getValidTopElement(event);
      if (!topElement) return;

      inspectTargetRef.current = topElement;
      setInspectTarget(topElement);
      setInspectRect(topElement.getBoundingClientRect());
    };

    const onMouseClick = (event: MouseEvent) => {
      const topElement = getValidTopElement(event);
      if (!topElement) return;

      event.preventDefault();
      event.stopPropagation();

      const exerciseStepElement = topElement.closest(`[${EXERCISE_STEP_ATTRIBUTE}]`) as HTMLElement | null;
      const stepPropertyValue = exerciseStepElement?.getAttribute(EXERCISE_STEP_ATTRIBUTE);
      if (stepPropertyValue && isExerciseStepId(stepPropertyValue)) {
        completeStep(stepPropertyValue);
      }

      setSelectedTarget(topElement);
      setInspectMode(false);
    };

    const updateInspectRect = () => {
      const target = inspectTargetRef.current;
      if (!target) return;

      setInspectRect(target.getBoundingClientRect());
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("click", onMouseClick, true);
    document.addEventListener("scroll", updateInspectRect, true);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onMouseClick, true);
      document.removeEventListener("scroll", updateInspectRect, true);
    };
  }, [inspectMode]);

  return (
    <>
      {inspectMode && inspectRect && (
        <Box
          sx={{
            position: "fixed",
            pointerEvents: "none",
            left: inspectRect.left,
            top: inspectRect.top,
            width: inspectRect.width,
            height: inspectRect.height,
            border: "2px solid",
            borderColor: "primary.main",
            bgcolor: "rgba(25, 118, 210, 0.35)",
            zIndex: 99999,
          }}
        />
      )}
    </>
  );
};

export default ElementInspector;
