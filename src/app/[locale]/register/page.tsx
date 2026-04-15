import RegisterPage from "@/components/pages/registerPage/registerPage";

type PageProps = {
  searchParams?: {
    checkoutRedirect?: string;
    keepsPlusAccepted?: string;
  };
};

const Page = async ({ searchParams }: PageProps) => {
  return <RegisterPage searchParams={await searchParams} />;
};

export default Page;
