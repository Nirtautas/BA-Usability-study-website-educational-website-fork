"use client";

import { EXERCISE_NAVBAR_HEIGHT, getPageUrl } from "@/data/constants";
import { useExercise } from "@/data/contexts/exerciseContext/exerciseContext";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const RestartExercisePage = () => {
  const { isExerciseCompleted, isExerciseFailed } = useExercise();
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const isOpen = isExerciseCompleted || isExerciseFailed;

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: `${EXERCISE_NAVBAR_HEIGHT}px`,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        bgcolor: "rgba(0, 0, 0, 0.65)",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2} alignItems="center">
        {isExerciseCompleted && <Typography variant="h6">Congratulations on finding the deceptive pattern!</Typography>}
        {isExerciseFailed && <Typography variant="h6">You failed to find the deceptive pattern.</Typography>}
        <Typography variant="body2">Please click &quot;Restart exercise&quot; to try again.</Typography>

        <Button
          variant="contained"
          href={getPageUrl.reset(params.uniquePathFragment)}
          sx={{
            bgcolor: "#F6303D",
            "&:hover": { bgcolor: "#d82934" },
          }}
        >
          Restart exercise
        </Button>
      </Stack>
    </Box>
  );
};

export default RestartExercisePage;
