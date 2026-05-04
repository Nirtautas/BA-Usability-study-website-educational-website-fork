"use client";

import { EXERCISE_NAVBAR_HEIGHT, getPageUrl } from "@/data/constants";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { AppBar, Button, Divider, Stack, Toolbar, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const ExerciseNavbar = () => {
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "#424C55",
        backgroundColor: "#F5EDF0",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          alignItems: "stretch",
          height: `${EXERCISE_NAVBAR_HEIGHT}px`,
        }}
      >
        <Stack flex={1} padding={2}>
          <Typography fontWeight={600}>Task list:</Typography>
          <Typography>Task List</Typography>
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#424C55" }} />

        <Stack flex={1} padding={2}>
          <Typography color="text.secondary">Result:</Typography>
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#424C55" }} />

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
