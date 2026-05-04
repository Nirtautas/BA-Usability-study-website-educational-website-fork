import HomePage from "@/components/pages/homePage/homePage";
import { isUniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
    uniquePathFragment: string;
  }>;
};

const Home = async ({ params }: Props) => {
  const { uniquePathFragment } = await params;

  if (!isUniquePathFragment(uniquePathFragment)) {
    notFound();
  }

  return <HomePage />;
};

export default Home;
