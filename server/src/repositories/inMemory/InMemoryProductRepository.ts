import type { Product } from "../../schemas/ProductSchema";

class InMemoryProductRepository {
    products: Product[];
    constructor() {
        this.products = [];
    }

    add(product: Product) {
        this.products.push(product);
        return product;
    }

    update(product: Product) {
        const idxProduct = this.products.findIndex(p => p.id === product.id);
        if(idxProduct !== -1) {
            this.products.splice(idxProduct, 1, product);
        }
        return idxProduct;
    }

    getById(id: string) {
        const idxProduct = this.products.findIndex(p => p.id === id);
     
        return this.products[idxProduct];
    }

    findAll() {
        return this.products;
    }
}

export default InMemoryProductRepository