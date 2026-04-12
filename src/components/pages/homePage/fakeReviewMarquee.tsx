"use client";

import { fakeReviewUserData, ratings } from "@/data/entityData";
import { FakeReviewCardData } from "@/data/types";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import FakeReviewCard from "./fakeReviewCard";

const scrollLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

export default function ReviewMarquee() {
  const fakeReviewData: FakeReviewCardData[] = ratings
    .map((review) => {
      const user = fakeReviewUserData.find((user) => user.id === review.userId);

      if (!user) {
        return null;
      }

      return {
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicturePath: user.profilePicturePath,
        rating: review.rating,
        description: review.comment,
      };
    })
    .filter(Boolean) as FakeReviewCardData[];

  const marqueeData = [...fakeReviewData, ...fakeReviewData];

  return (
    <Box overflow="hidden" width="100%" padding={1}>
      <Box
        display="flex"
        gap={2}
        width="max-content"
        sx={{
          animation: `${scrollLeft} 30s linear infinite`,
        }}
      >
        {marqueeData.map((fakeReview, index) => (
          <FakeReviewCard key={index} fakeReviewData={fakeReview} />
        ))}
      </Box>
    </Box>
  );
}
