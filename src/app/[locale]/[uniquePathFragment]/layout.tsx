import ExerciseLockOverlay from "@/components/templates/exerciseLockOverlay";
import Footer from "@/components/templates/footer";
import MarketingPopup from "@/components/templates/marketingPopup";
import ExerciseNavbar from "@/components/templates/navBar/exerciseNavBar";
import NavBar from "@/components/templates/navBar/navBar";
import { CartProvider } from "@/data/contexts/cartContext";
import { ExerciseProvider } from "@/data/contexts/exerciseContext/exerciseContext";
import { SubscriptionDataProvider } from "@/data/contexts/subscriptionContext";
import { UserDataProvider } from "@/data/contexts/userContext";
import ElementInspector from "@/utils/elementInspector/elementInspector";
import { ElementInspectorProvider } from "@/utils/elementInspector/elementInspectorContext";
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
      <ExerciseProvider>
        <ElementInspectorProvider>
          <UserDataProvider>
            <CartProvider>
              <SubscriptionDataProvider>
                <ExerciseNavbar />
                <ElementInspector />
                <ExerciseLockOverlay />

                <NavBar uniquePathFragment={uniquePathFragment} />
                {children}
                <Footer uniquePathFragment={uniquePathFragment} />
                <MarketingPopup />
              </SubscriptionDataProvider>
            </CartProvider>
          </UserDataProvider>
        </ElementInspectorProvider>
      </ExerciseProvider>
    </>
  );
}
