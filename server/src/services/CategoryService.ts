import { Category } from "../schemas/CategorySchema";
import CategoryRepository from "../repositories/_inMemory/CategoryRepository";
import { v4 as uuidv4 } from 'uuid';

const categoryRepository = new CategoryRepository();

class CategoryService {
    constructor() { }

    add(category: Category): Category  {
        const savedCategory = categoryRepository.add({...category as Category, id: uuidv4()});
        return savedCategory;
    }

    getById(id_category: string): Category | undefined {
        const category = categoryRepository.getById(id_category);

        return category;
    }

    update(category: Category) {
        const savedCategory = categoryRepository.update(category);

        return savedCategory;
    }

    delete(id_category: string) {
        const idx = categoryRepository.delete(id_category);

        return idx;
    }

    findAll() {
        const categories = categoryRepository.findAll();

        return categories;
    }
}

export default CategoryService;