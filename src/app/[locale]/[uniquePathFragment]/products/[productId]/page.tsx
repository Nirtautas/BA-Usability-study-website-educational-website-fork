import ProductPage from "@/components/pages/productPage/productPage";
import { notFound } from "next/navigation";

type Props = {
  params: {
    productId: string;
  };
};

const Page = async ({ params }: Props) => {
  const { productId } = await params;
  const number = parseInt(productId);
  if (isNaN(number)) {
    notFound();
  }

  return <ProductPage productId={number} />;
};

export default Page;
