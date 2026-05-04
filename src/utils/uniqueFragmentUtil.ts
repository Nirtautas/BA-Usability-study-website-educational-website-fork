import { AllowedPathFragments } from "@/data/constants";

export type UniquePathFragment =
  (typeof AllowedPathFragments)[keyof typeof AllowedPathFragments];

  export const isUniquePathFragment = (value: string): value is UniquePathFragment => {
    return Object.values(AllowedPathFragments).includes(value as UniquePathFragment);
  };