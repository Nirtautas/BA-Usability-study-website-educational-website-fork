import { FakeReviewCardData } from "@/data/types";
import { Avatar, Card, CardContent, Rating, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = {
  fakeReviewData: FakeReviewCardData;
};

const FakeReviewCard = ({ fakeReviewData }: Props) => {
  const t = useTranslations();

  return (
    <Card
      sx={{
        minWidth: 400,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack direction="row" gap={1} alignItems="center" paddingBottom={1}>
          <Avatar src={fakeReviewData.profilePicturePath} />
          <Typography fontWeight={600}>{`${t(fakeReviewData.firstName)} ${t(fakeReviewData.lastName)}`}</Typography>
          <Rating readOnly={true} value={fakeReviewData.rating} sx={{ marginLeft: "auto" }} />
        </Stack>
        <Typography>{t(fakeReviewData.description)}</Typography>
      </CardContent>
    </Card>
  );
};

export default FakeReviewCard;
