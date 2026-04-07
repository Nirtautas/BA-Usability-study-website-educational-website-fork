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

export const placeholderImageLink = "/images/productPictures/placeholder.jpg";
export const maxProductThumbnails = 5;
export const serviceFee = 2.99;