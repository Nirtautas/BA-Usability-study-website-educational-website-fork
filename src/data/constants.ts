import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";

export const getPageUrl = {
    home: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/`,
    products: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/products`,
    product: (id: number, uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/products/${id}`,
    cart: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/cart`,
    checkout: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/checkout`,
    login: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/login`,
    register: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/register`,
    orderComplete: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/order-complete`,
    attributions: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/attributions`,
    keepsBox: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/keeps-box`,
    subscriptions: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/subscriptions`,
    reset: (uniqueFragment: UniquePathFragment) => `/${uniqueFragment}/reset`,
}

export const AllowedPathFragments = {
  SneakIntoBasket: "sneak-into-basket",
  HiddenCosts: "hidden-costs",
  HiddenSubscription: "hidden-subscription",
  LimitedTimeMessage: "limited-time-message",
  Confirmshaming: "confirmshaming",
  VisualInterference: "visual-interference",
  TrickQuestions: "trick-questions",
  HardToCancel: "hard-to-cancel",
  ForcedEnrollment: "forced-enrollment",
} as const;

export const placeholderImageLink = "/images/products/placeholder.jpg";
export const landingPageImageLink = "/images/landingPagePicture.jpg";
export const loginPageImageLink = "/images/loginPagePicture.jpg";
export const registerPageImageLink = "/images/registerPagePicture.jpg";
export const keepsBoxPicture = "/images/keepsBoxPicture.jpg";

export const maxProductThumbnails = 5;
export const serviceFee = 2.99;

export const postDeliveryPrice = 2.29;
export const parcelLockerPrice = 1.99;

export const EXERCISE_NAVBAR_HEIGHT = 128;

export const CART_STORAGE_KEY = "cart";
export const SUBSCRIPTION_STORAGE_KEY = "subscriptionData";
export const USER_ID_STORAGE_KEY = "loggedInUserId";
export const USER_DATA_STORAGE_KEY = "userData";
export const REFUSED_MARKETING_STORAGE_KEY = "refusedMarketing";
export const MARKETING_TIMER_EXECUTED_STORAGE_KEY = "marketingTimerExecuted";