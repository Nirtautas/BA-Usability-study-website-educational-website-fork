import { Bank, DeliveryLocation, FakeUserReview, Gender, Product, ProductType, UserInfo} from "./types";

export const products: Product[] = [
  {
    id: 1,
    type: ProductType.DeceptiveExtra,
    name: "Products.P1.name",
    description: "Products.P1.description",
    price: 1.49,
    rating: 5,
    ratingCount: 100,
    deliveryTime: "1-2",
    picturePaths: ["/images/products/deceptive_extra.png"],
    stock: 9999
  },
  {
    id: 2,
    type: ProductType.Shoes,
    name: "Products.P2.name",
    description: "Products.P2.description",
    price: 79.99,
    rating: 4.8,
    ratingCount: 125,
    deliveryTime: "1-2",
    picturePaths: ["/images/products/shoes/men_shoe_1.png"],
    stock: 12
  },
  {
    id: 3,
    type: ProductType.Shoes,
    name: "Products.P3.name",
    description: "Products.P3.description",
    price: 65.99,
    rating: 3.8,
    ratingCount: 15,
    deliveryTime: "1-4",
    picturePaths: ["/images/products/shoes/men_shoe_2.png"],
    stock: 3
  },
  {
    id: 4,
    type: ProductType.Shirts,
    name: "Products.P4.name",
    description: "Products.P4.description",
    price: 40.99,
    discountedPrice: 25.99,
    rating: 4.2,
    ratingCount: 18,
    deliveryTime: "7-14",
    picturePaths: ["/images/products/blouses/women_blouse_1_1.png", "/images/products/blouses/women_blouse_1_2.png"],
    stock: 7
  },
  {
    id: 5,
    type: ProductType.Shoes,
    name: "Products.P5.name",
    description: "Products.P5.description",
    price: 57.99,
    discountedPrice: 52.99,
    rating: 4.2,
    ratingCount: 73,
    deliveryTime: "7-14",
    picturePaths: ["/images/products/shoes/women_shoe_1.png"],
    stock: 15
  },
  {
    id: 6,
    type: ProductType.Shoes,
    name: "Products.P6.name",
    description: "Products.P6.description",
    price: 61.99,
    rating: 3.9,
    ratingCount: 112,
    deliveryTime: "7-14",
    picturePaths: ["/images/products/shoes/women_shoe_2.png"],
    stock: 2
  },
  {
    id: 7,
    type: ProductType.Pants,
    name: "Products.P7.name",
    description: "Products.P7.description",
    price: 50.99,
    rating: 4.5,
    ratingCount: 56,
    deliveryTime: "1-2",
    picturePaths: ["/images/products/pants/women_pants_1_1.png", "/images/products/pants/women_pants_1_2.png"],
    stock: 1
  },
  {
    id: 8,
    type: ProductType.Pants,
    name: "Products.P8.name",
    description: "Products.P8.description",
    price: 55.99,
    discountedPrice: 48.99,
    rating: 4.4,
    ratingCount: 48,
    deliveryTime: "1-2",
    picturePaths: ["/images/products/pants/women_pants_2_1.png", "/images/products/pants/women_pants_2_2.png"],
    stock: 12
  },
  {
    id: 9,
    type: ProductType.Pants,
    name: "Products.P9.name",
    description: "Products.P9.description",
    price: 60.99,
    rating: 3.4,
    ratingCount: 35,
    deliveryTime: "7-14",
    picturePaths: ["/images/products/pants/men_pants_1_1.png", "/images/products/pants/men_pants_1_2.png"],
    stock: 25
  },
  {
    id: 10,
    type: ProductType.Dresses,
    name: "Products.P10.name",
    description: "Products.P10.description",
    price: 125.99,
    rating: 4.6,
    ratingCount: 48,
    deliveryTime: "7-14",
    picturePaths: ["/images/products/dresses/women_dress_1_1.png", "/images/products/dresses/women_dress_1_2.png"],
    stock: 8
  },
  {
    id: 11,
    type: ProductType.Dresses,
    name: "Products.P11.name",
    description: "Products.P11.description",
    price: 145.99,
    discountedPrice: 110.99,
    rating: 4.3,
    ratingCount: 189,
    deliveryTime: "1-2",
    picturePaths: ["/images/products/dresses/women_dress_2_1.png", "/images/products/dresses/women_dress_2_2.png"],
    stock: 6
  },
  {
    id: 12,
    type: ProductType.Dresses,
    name: "Products.P12.name",
    description: "Products.P12.description",
    price: 89.99,
    rating: 3.2,
    ratingCount: 32,
    deliveryTime: "7-14",
    picturePaths: ["/images/products/dresses/women_dress_3_1.png", "/images/products/dresses/women_dress_3_2.png"],
    stock: 4
  },
  {
    id: 13,
    type: ProductType.Dresses,
    name: "Products.P13.name",
    description: "Products.P13.description",
    price: 99.99,
    rating: 4.1,
    ratingCount: 59,
    deliveryTime: "7-14",
    picturePaths: ["/images/products/dresses/women_dress_4_1.png", "/images/products/dresses/women_dress_4_2.png"],
    stock: 1
  },
  {
    id: 14,
    type: ProductType.Shirts,
    name: "Products.P14.name",
    description: "Products.P14.description",
    price: 41.99,
    rating: 4.7,
    ratingCount: 64,
    deliveryTime: "1-2",
    picturePaths: ["/images/products/blouses/women_blouse_2_1.png", "/images/products/blouses/women_blouse_2_2.png"],
    stock: 19
  },
  {
    id: 15,
    type: ProductType.Shirts,
    name: "Products.P15.name",
    description: "Products.P15.description",
    price: 35.99,
    discountedPrice: 32.99,
    rating: 3.9,
    ratingCount: 178,
    deliveryTime: "1-2",
    picturePaths: ["/images/products/shirts/men_shirt_1_1.png", "/images/products/shirts/men_shirt_1_2.png"],
    stock: 23
  },
  {
    id: 16,
    type: ProductType.Shirts,
    name: "Products.P16.name",
    description: "Products.P16.description",
    price: 38.99,
    rating: 4.5,
    ratingCount: 112,
    deliveryTime: "1-2",
    picturePaths: ["/images/products/shirts/men_shirt_2_1.png", "/images/products/shirts/men_shirt_2_2.png"],
    stock: 14
  },
];

export const banks: Bank[] = [
  {
    id: 1,
    name: "Fintech",
    picturePath: "/images/bankPictures/fintech.jpg"
  },
  {
    id: 2,
    name: "Finance",
    picturePath: "/images/bankPictures/finance.jpg"
  },
  {
    id: 3,
    name: "Avobank",
    picturePath: "/images/bankPictures/avobank.jpg"
  },
  {
    id: 4,
    name: "MoneyCare",
    picturePath: "/images/bankPictures/moneycare.jpg"
  },
  {
    id: 5,
    name: "FastCash",
    picturePath: "/images/bankPictures/fastcash.jpg"
  },
];

export const storeLocations: DeliveryLocation[] = [
  {
    id: 1,
    locationName: "Vilnius, Titnago g. 15"
  },
  {
    id: 2,
    locationName: "Kaunas, Šiaurės pr. 20"
  },
  {
    id: 3,
    locationName: "Klapėda, Plento g, 12"
  },
  {
    id: 4,
    locationName: "Šiauliai, Gėlių g. 5"
  },
  {
    id: 5,
    locationName: "Panevėžys, Nevėžio g. 1A"
  }
];

export const postOfficeLocations: DeliveryLocation[] = [
  {
    id: 1,
    locationName: "Vilnius, Vokiečių g. 7"
  },
  {
    id: 2,
    locationName: "Kaunas, Karaliaus Mindaugo pr. 49"
  },
  {
    id: 3,
    locationName: "Klaipėda, H. Manto g. 7"
  },
  {
    id: 4,
    locationName: "Šiauliai, Tilžės g. 225"
  },
  {
    id: 5,
    locationName: "Panevėžys, Ukmergės g. 18"
  }
];

export const parcelLockerLocations: DeliveryLocation[] = [
  {
    id: 1,
    locationName: "Vilnius, Totorių g. 8"
  },
  {
    id: 2,
    locationName: "Kaunas, Kovo 11-osios g. 20"
  },
  {
    id: 3,
    locationName: "Klaipėda, Taikos pr. 61"
  },
  {
    id: 4,
    locationName: "Šiauliai, Aido g. 8"
  },
  {
    id: 5,
    locationName: "Panevėžys, Vakarinė g. 61"
  }
];

export const testUserData: UserInfo = {
  id: 1,
  firstName: "test",
  lastName: "test",
  email: "test@test.com",
  phoneNumber: "111111111",
  password: "test",
  gender: Gender.Male
};

export const fakeReviewUserData: UserInfo[] = [
  {
    id: 2,
    firstName: "FakeReviewUserData.D2.firstName",
    lastName: "FakeReviewUserData.D2.lastName",
    email: "",
    phoneNumber: "",
    password: "",
    gender: Gender.Female,
    profilePicturePath: "/images/fakeReviewAvatars/woman_1.png"
  },
  {
  id: 3,
    firstName: "FakeReviewUserData.D3.firstName",
    lastName: "FakeReviewUserData.D3.lastName",
    email: "",
    phoneNumber: "",
    password: "",
    gender: Gender.Male,
    profilePicturePath: "/images/fakeReviewAvatars/man_1.png"
  },
  {
  id: 4,
    firstName: "FakeReviewUserData.D4.firstName",
    lastName: "FakeReviewUserData.D4.lastName",
    email: "",
    phoneNumber: "",
    password: "",
    gender: Gender.Male,
    profilePicturePath: "/images/fakeReviewAvatars/man_2.png"
  },
  {
  id: 5,
    firstName: "FakeReviewUserData.D5.firstName",
    lastName: "FakeReviewUserData.D5.lastName",
    email: "",
    phoneNumber: "",
    password: "",
    gender: Gender.Female,
    profilePicturePath: "/images/fakeReviewAvatars/woman_2.png"
  },
  {
  id: 6,
    firstName: "FakeReviewUserData.D6.firstName",
    lastName: "FakeReviewUserData.D6.lastName",
    email: "",
    phoneNumber: "",
    password: "",
    gender: Gender.Male,
    profilePicturePath: "/images/fakeReviewAvatars/man_3.png"
  },
{
  id: 7,
    firstName: "FakeReviewUserData.D7.firstName",
    lastName: "FakeReviewUserData.D7.lastName",
    email: "",
    phoneNumber: "",
    password: "",
    gender: Gender.Female,
    profilePicturePath: "/images/fakeReviewAvatars/woman_3.png"
  },
];

export const ratings: FakeUserReview[] = [
  {
    id: 1,
    userId: 2,
    rating: 5,
    comment: "FakeUserReview.R1.reviewComment"
  },
  {
    id: 2,
    userId: 3,
    rating: 5,
    comment: "FakeUserReview.R2.reviewComment"
  },
  {
    id: 3,
    userId: 4,
    rating: 5,
    comment: "FakeUserReview.R3.reviewComment"
  },
  {
    id: 4,
    userId: 5,
    rating: 5,
    comment: "FakeUserReview.R4.reviewComment"
  },
  {
    id: 5,
    userId: 6,
    rating: 5,
    comment: "FakeUserReview.R5.reviewComment"
  },
  {
    id: 6,
    userId: 7,
    rating: 5,
    comment: "FakeUserReview.R6.reviewComment"
  },
];