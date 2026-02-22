import ProductsPage from "@/components/pages/productsPage/productsPage";

type PageProps = {
  searchParams?: {
    minPrice?: string;
    maxPrice?: string;
    onlyDiscounted?: string;
    productType?: string | string[];
  };
};

const Page = async ({ searchParams }: PageProps) => {
  return <ProductsPage searchParams={await searchParams} />;
};

export default Page;
