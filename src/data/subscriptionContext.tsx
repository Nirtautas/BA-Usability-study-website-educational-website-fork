"use client";

import { products } from "@/data/entityData";
import { useTranslations } from "next-intl";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCart } from "./cartContext";
import { ProductType, SubscriptionContextInterface, UserInfoSubscriptionInfo } from "./types";
import { useUserContext } from "./userContext";

const SubscriptionContext = createContext<SubscriptionContextInterface | undefined>(undefined);

export function SubscriptionDataProvider({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const cartContext = useCart();
  const userContext = useUserContext();
  const [subscriptionData, setSubscriptionData] = useState<UserInfoSubscriptionInfo[]>([]);

  useEffect(() => {
    const subscriptionData = sessionStorage.getItem("subscriptionData");
    const parsedSubscriptionData = JSON.parse(subscriptionData || "[]");

    setSubscriptionData(parsedSubscriptionData);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("subscriptionData", JSON.stringify(subscriptionData));
  }, [subscriptionData]);

  const getUserSubscriptions = (userId: number) => {
    const subscriptionIds = subscriptionData.filter((subscription) => subscription.userId === userId);
    return products.filter((product) => subscriptionIds.some((subscription) => subscription.subscriptionId === product.id));
  };

  const linkSubscriptionToCurrentUser = (subscriptionId: number) => {
    const userData = userContext?.getLoggedInUserData();
    if (userData) {
      const subscription = products.find((product) => product.id === subscriptionId);
      if (!subscription || subscription.type !== ProductType.Subscriptions) {
        return;
      }

      setSubscriptionData((prevData) => {
        const alreadyLinked = prevData.some((item) => item.userId === userData.id && item.subscriptionId === subscriptionId);

        if (alreadyLinked) {
          return prevData;
        }

        let next = prevData;

        if (subscription.keepsBox) {
          next = prevData.filter((item) => {
            if (item.userId !== userData.id) return true;

            const linkedProduct = products.find((product) => product.id === item.subscriptionId);
            return !linkedProduct?.keepsBox;
          });
        }

        return [...next, { userId: userData.id, subscriptionId }];
      });
    }
  };

  const getCurrentUserSubscriptionCount = () => {
    const loggedInUserData = userContext?.getLoggedInUserData();
    if (loggedInUserData) {
      return subscriptionData.filter((subscription) => subscription.userId === loggedInUserData.id).length;
    }
    return 0;
  };

  const linkCartSubscriptionsToCurrentUser = () => {
    const loggedInUserData = userContext?.getLoggedInUserData();
    if (loggedInUserData) {
      const cartItems = cartContext?.getFullCartItems();
      cartItems
        ?.filter((i) => i.item.type === ProductType.Subscriptions)
        .forEach((subscription) => {
          linkSubscriptionToCurrentUser(subscription.item.id);
        });
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        UserInfoSubscriptionInfo: subscriptionData,
        getUserSubscriptions,
        linkSubscriptionToCurrentUser,
        linkCartSubscriptionsToCurrentUser,
        getCurrentUserSubscriptionCount,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  const context = useContext(SubscriptionContext);
  return context;
}
