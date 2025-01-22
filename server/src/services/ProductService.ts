import type { Product } from "../schemas/ProductSchema";
import InMemoryProductRepository from "../repositories/inMemory/InMemoryProductRepository";
import { v4 as uuidv4 } from 'uuid';
const inMemoryProductRepository = new InMemoryProductRepository();
class ProductService {
    constructor() {

    }


    add(product: Product) {
        const savedProduct = inMemoryProductRepository.add({...product, id: uuidv4()})

        return savedProduct;
    }

    update(product: Product) {
        const updatedProduct = inMemoryProductRepository.update(product);

        return updatedProduct;
    }

    getById(id: string) {
        const product = inMemoryProductRepository.getById(id);

        return product;
    }

    findAll() {
        const products = inMemoryProductRepository.findAll();
        
        return products;
    }
}

export default ProductService;