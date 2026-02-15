export const getPageUrl = {
    home: () => '/',
    products: () => '/products',
    product: (id: number) => `/products/${id}`,
    cart: () => `/cart`,
    login: () => '/login',
}

export const placeholderImageLink = "/images/productPictures/placeholder.jpg";