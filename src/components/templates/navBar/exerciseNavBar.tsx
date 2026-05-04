"use client";

import { EXERCISE_NAVBAR_HEIGHT, getPageUrl } from "@/data/constants";
import { stepDefinitions } from "@/data/contexts/exerciseContext/exerciseConfiguration";
import { useExercise } from "@/data/contexts/exerciseContext/exerciseContext";
import { useRouter } from "@/i18n/navigation";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { AppBar, Button, Divider, Stack, Toolbar, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const ExerciseNavbar = () => {
  const router = useRouter();
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const { exercise, visibleStepIds, isStepCompleted, isExerciseCompleted, isExerciseFailed } = useExercise();

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 2,
        borderColor: "#424C55",
        backgroundColor: "#ededed",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          alignItems: "stretch",
          height: `${EXERCISE_NAVBAR_HEIGHT}px`,
        }}
      >
        <Stack flex={1} padding={1}>
          <Typography fontWeight={600}>{exercise.title}</Typography>
          <Divider flexItem sx={{ bgcolor: "#424C55" }} />
          <Stack
            spacing={0.5}
            paddingRight={1}
            sx={{
              overflowY: "auto",
            }}
          >
            {visibleStepIds.map((stepId, index) => {
              const step = stepDefinitions[stepId];
              const stepCompleted = isStepCompleted(stepId);

              return (
                <Typography key={stepId} color={stepCompleted ? "success.main" : "text.primary"}>
                  {index + 1}. {step.label}
                </Typography>
              );
            })}
          </Stack>
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#424C55", border: 2 }} />

        <Stack flex={1} padding={1}>
          <Typography fontWeight={600}>Result:</Typography>
          <Divider flexItem sx={{ bgcolor: "#424C55" }} />

          {isExerciseCompleted ? (
            <Typography color="success.main" fontWeight={600}>
              {exercise.successMessage}
            </Typography>
          ) : isExerciseFailed ? (
            <Typography color="error.main" fontWeight={600}>
              {exercise.failMessage}
            </Typography>
          ) : (
            <Typography>Complete the exercise steps to see the result...</Typography>
          )}
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#424C55", border: 2 }} />

        <Stack spacing={1} width={260} padding={2} justifyContent="center">
          <Button variant="contained" sx={{ bgcolor: "#5F56FF" }}>
            Selection mode
          </Button>
          <Button variant="contained" href={getPageUrl.reset(params.uniquePathFragment)} sx={{ bgcolor: "#F6303D" }}>
            Restart exercise
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default ExerciseNavbar;
