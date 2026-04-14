export const getPageUrl = {
    home: () => '/',
    products: () => '/products',
    product: (id: number) => `/products/${id}`,
    cart: () => `/cart`,
    checkout: () => `/checkout`,
    login: () => '/login',
    register: () => '/register',
    orderComplete: () => `/order-complete`,
    attributions: () => `/attributions`,
    keepsBox: () => `/keeps-box`
}

export const placeholderImageLink = "/images/products/placeholder.jpg";
export const landingPageImageLink = "/images/landingPagePicture.jpg";
export const loginPageImageLink = "/images/loginPagePicture.jpg";
export const registerPageImageLink = "/images/registerPagePicture.jpg";
export const keepsBoxPicture = "/images/keepsBoxPicture.jpg";

export const maxProductThumbnails = 5;
export const serviceFee = 2.99;

export const postDeliveryPrice = 2.29;
export const parcelLockerPrice = 1.99;