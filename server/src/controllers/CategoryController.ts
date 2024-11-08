import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import { CategorySchema, GetByIdSchema } from "../schemas/CategorySchema";
const categoryService = new CategoryService();

class CategoryController {
    constructor() { }

    async add(Req: Request, Res: Response) {
        try {

            const validatedCategory = await CategorySchema.validate(Req.body, {stripUnknown: true});

            if(validatedCategory) {
                const category = categoryService.add(validatedCategory);
                
                Res.status(201).json(category);
            } else {
                Res.status(400).json({message: "Erro ao cadastrar uma categoria, por favor tente novamente", error: true})
            }
        } catch (error: any) {
            Res.status(400).json(error.errors)
        }
    }

    async getById(Req: Request, Res: Response) {
        try {
            const validatedId = await GetByIdSchema.validate(Req.params);
            if(validatedId) {
                const category = categoryService.getById(validatedId as string);
                if(!category) {
                    Res.status(400).json({message: "Nenhuma categoria com esse ID foi encontrado!", error: false});
                }
                Res.status(200).json(category);
            }
        } catch (error: any) {
            console.error(error);
            Res.status(400).json(error.errors)
        }
    }

    async update(Req: Request, Res: Response) {
        try {
            const validatedCategory = await CategorySchema.validate(Req.body, {stripUnknown: true});
            if(validatedCategory) {
                const category = categoryService.update(validatedCategory);
                if(category) {
                    Res.status(200).json(category);
                } else {
                    Res.status(400).json({message: "Erro ao editar a categoria!", error: true});    
                }
            }
        } catch (error: any) {
            Res.status(400).json(error.errors);
        }
    }

    async delete(Req: Request, Res: Response) {
        
        try {
            const validatedId = await GetByIdSchema.validate(Req.params);
            if(validatedId) {
                const idxCategory = categoryService.delete(validatedId as string);
                if(idxCategory !== -1) {
                    Res.status(200).json({message: "Categoria deletada com sucesso!"});
                } else {
                    Res.status(400).json({message: "Algo deu errado para deletar a categoria!"});
                }
            }
        } catch (error: any) {
            Res.status(400).json(error.errors);
        }
    }

    findAll(Req: Request, Res: Response) {
        try {
            const categories = categoryService.findAll();

            Res.status(200).json(categories);
        } catch (error) {
            Res.status(400).json({message: "Algo deu errado para filtrar as categorias!"});
        }
    }
}

export default CategoryController;