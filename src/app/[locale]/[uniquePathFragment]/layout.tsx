import Footer from "@/components/templates/footer";
import MarketingPopup from "@/components/templates/marketingPopup";
import ExerciseNavbar from "@/components/templates/navBar/exerciseNavBar";
import NavBar from "@/components/templates/navBar/navBar";
import { CartProvider } from "@/data/contexts/cartContext";
import { SubscriptionDataProvider } from "@/data/contexts/subscriptionContext";
import { UserDataProvider } from "@/data/contexts/userContext";
import { isUniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
    uniquePathFragment: string;
  }>;
};

export default async function FragmentLayout({ children, params }: Props) {
  const { uniquePathFragment } = await params;

  if (!isUniquePathFragment(uniquePathFragment)) {
    notFound();
  }

  return (
    <>
      <UserDataProvider>
        <CartProvider>
          <SubscriptionDataProvider>
            <ExerciseNavbar />
            <NavBar uniquePathFragment={uniquePathFragment} />
            {children}
            <Footer uniquePathFragment={uniquePathFragment} />
            <MarketingPopup />
          </SubscriptionDataProvider>
        </CartProvider>
      </UserDataProvider>
    </>
  );
}
