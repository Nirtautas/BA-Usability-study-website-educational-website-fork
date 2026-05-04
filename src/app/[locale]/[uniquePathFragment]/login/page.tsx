import LoginPage from "@/components/pages/loginPage/loginPage";

type PageProps = {
  searchParams?: {
    checkoutRedirect?: string;
    keepsPlusAccepted?: string;
  };
};

const Page = async ({ searchParams }: PageProps) => {
  return <LoginPage searchParams={await searchParams} />;
};

export default Page;
