import { InMemoryRepository } from "./base/repository";
import { Product } from "../data/types";

export class ProductRepository extends InMemoryRepository<Product> {
    constructor (initialProducts: Product[] = []) {
        super(initialProducts);
    }
}