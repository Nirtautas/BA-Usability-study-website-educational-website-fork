export const getPageUrl = {
    home: () => '/',
    products: () => '/products',
    product: (id: number) => `/products/${id}`,
    cart: () => `/cart`,
    checkout: () => `/checkout`,
    login: () => '/login',
    orderComplete: () => `/order-complete`,
    attributions: () => `/attributions`
}

export const placeholderImageLink = "/images/products/placeholder.jpg";
export const maxProductThumbnails = 5;
export const serviceFee = 2.99;

export const postDeliveryPrice = 2.29;
export const parcelLockerPrice = 1.99;