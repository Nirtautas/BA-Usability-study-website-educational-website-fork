export const getPageUrl = {
    home: () => '/',
    products: () => '/products',
    product: (id: number) => `/products/${id}`,
    cart: () => `/cart`,
    checkout: () => `/checkout`,
    login: () => '/login',
}

export const placeholderImageLink = "/images/productPictures/placeholder.jpg";
export const maxProductThumbnails = 5;