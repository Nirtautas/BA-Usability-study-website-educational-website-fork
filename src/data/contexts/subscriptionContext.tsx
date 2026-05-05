"use client";

import { products } from "@/data/entityData";
import { useTranslations } from "next-intl";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SUBSCRIPTION_STORAGE_KEY } from "../constants";
import { ProductType, SubscriptionContextInterface, SubscriptionType, UserInfoSubscriptionInfo } from "../types";
import { useCart } from "./cartContext";
import { useUserContext } from "./userContext";

const SubscriptionContext = createContext<SubscriptionContextInterface | undefined>(undefined);

const SubscriptionDataProvider = ({ children }: { children: ReactNode }) => {
  const t = useTranslations();
  const cartContext = useCart();
  const userContext = useUserContext();
  const [subscriptionData, setSubscriptionData] = useState<UserInfoSubscriptionInfo[]>([]);

  useEffect(() => {
    const subscriptionData = sessionStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    const parsedSubscriptionData = JSON.parse(subscriptionData || "[]");

    setSubscriptionData(parsedSubscriptionData);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(subscriptionData));
  }, [subscriptionData]);

  const getUserSubscriptions = (userId: number) => {
    const subscriptionIds = subscriptionData.filter((subscription) => subscription.userId === userId);
    return products.filter((product) => subscriptionIds.some((subscription) => subscription.subscriptionId === product.id));
  };

  const linkSubscriptionToCurrentUser = (subscriptionId: number, userId?: number) => {
    const userData = userId ? { id: userId } : userContext?.getLoggedInUserData();
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

        if (subscription.subscriptionType === SubscriptionType.KeepsBox) {
          next = prevData.filter((item) => {
            if (item.userId !== userData.id) return true;

            const linkedProduct = products.find((product) => product.id === item.subscriptionId);
            return linkedProduct?.subscriptionType !== SubscriptionType.KeepsBox;
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
          linkSubscriptionToCurrentUser(subscription.item.id, loggedInUserData.id);
        });
    }
  };

  const userHasKeepsPlusSubscription = () => {
    const loggedInUserData = userContext?.getLoggedInUserData();
    if (loggedInUserData) {
      return subscriptionData.some((subscription) => {
        if (subscription.userId === loggedInUserData.id) {
          const linkedProduct = products.find((product) => product.id === subscription.subscriptionId);
          return linkedProduct?.subscriptionType === SubscriptionType.KeepsPlus;
        }
        return false;
      });
    }
    return false;
  };

  const getKeepsPlusSubscriptionId = () => {
    const keepsPlusSubscription = products.find((product) => product.subscriptionType === SubscriptionType.KeepsPlus);
    return keepsPlusSubscription?.id;
  };

  return (
    <SubscriptionContext.Provider
      value={{
        UserInfoSubscriptionInfo: subscriptionData,
        getUserSubscriptions,
        linkSubscriptionToCurrentUser,
        linkCartSubscriptionsToCurrentUser,
        getCurrentUserSubscriptionCount,
        userHasKeepsPlusSubscription,
        getKeepsPlusSubscriptionId,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

const useSubscriptionContext = () => {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error("useSubscriptionContext must be used inside SubscriptionDataProvider");
  }

  return context;
};

export { SubscriptionDataProvider, useSubscriptionContext };
