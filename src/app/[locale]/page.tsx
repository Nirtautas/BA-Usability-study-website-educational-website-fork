import { AllowedPathFragments } from "@/data/constants";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const Home = async function Home({ params }: Props) {
  const { locale } = await params;

  redirect(`/${locale}/${AllowedPathFragments.SneakIntoBasket}`);
};

export default Home;
