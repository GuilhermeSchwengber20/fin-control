import { Category } from "../../schemas/CategorySchema";
class CategoryRepository {
    categories: Category[];

    constructor() {
        this.categories = [];
    }


    add(category: Category): Category {
        this.categories.push(category);
        return category;
    }

    getById(id: string): Category | undefined {
        const category = this.categories.find(ctg => ctg.id === id);
        if(category) {
            return category;

        }
    }

    update(category: Category): Category {
        const idxCat = this.categories.findIndex(cat => cat.id === category.id);
        if(idxCat !== -1) {
            this.categories.splice(idxCat, 1, category)
        }

        return this.categories[idxCat];
    }

    delete(id: string): number {
        const idxCat = this.categories.findIndex(cat => cat.id === id);
        if(idxCat !== -1) {
            this.categories.splice(idxCat, 1)
        }
        return idxCat
    }

    findAll() {
        return this.categories;
    }
}

export default CategoryRepository;