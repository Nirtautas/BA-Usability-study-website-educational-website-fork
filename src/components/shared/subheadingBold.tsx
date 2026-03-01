import { Typography } from "@mui/material";

type Props = {
  headingText: string;
};

const SubheadingBold = ({ headingText }: Props) => {
  return (
    <Typography variant="h6" fontWeight="bold">
      {headingText}
    </Typography>
  );
};

export default SubheadingBold;
