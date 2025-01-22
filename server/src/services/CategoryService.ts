import { Category } from "../schemas/CategorySchema";
import InMemoryCategoryRepository from "../repositories/inMemory/InMemoryCategoryRepository";
import { v4 as uuidv4 } from 'uuid';

const inMemoryCategoryRepository = new InMemoryCategoryRepository();

class CategoryService {
    constructor() { }

    add(category: Category): Category  {
        const savedCategory = inMemoryCategoryRepository.add({...category as Category, id: uuidv4()});
        return savedCategory;
    }

    getById(id_category: string): Category | undefined {
        const category = inMemoryCategoryRepository.getById(id_category);

        return category;
    }

    update(category: Category) {
        const savedCategory = inMemoryCategoryRepository.update(category);

        return savedCategory;
    }

    delete(id_category: string) {
        const idx = inMemoryCategoryRepository.delete(id_category);

        return idx;
    }

    findAll() {
        const categories = inMemoryCategoryRepository.findAll();

        return categories;
    }
}

export default CategoryService;