import { Request, Response } from "express";
import { GetProductByIdSchema, ProductSchema } from "../schemas/ProductSchema";
import ProductService from "../services/ProductService";
const productService = new ProductService();

class ProductController {
    constructor() {

    }

    async add(Req: Request, Res: Response) {
        try {
            const validatedProduct = await ProductSchema.validate(Req.body, {stripUnknown: true});

            if(validatedProduct) {
                const savedProduct = productService.add(validatedProduct);
                Res.status(201).json(savedProduct);
            } else {
                Res.status(400).json({message: "Erro ao cadastrar o produto, por favor tente novamente", error: true})
            }

        } catch (error: any) {
            Res.status(400).json(error.errors)
        }   
    }

    async update(Req: Request, Res: Response) {
        try {
            const validatedProduct = await ProductSchema.validate(Req.body, {stripUnknown: true});

            if(validatedProduct) {
                const updatedProduct = productService.update(validatedProduct);

                if(updatedProduct !== -1) {
                    Res.status(200).json(updatedProduct);
                } else {
                    Res.status(400).json({message: "Houve um problema para editar o produto por favor verifique", error: true})
                }
            }

        } catch (error: any) {
            Res.status(400).json({...error.errors});
        }
    }


    async getById(Req: Request, Res: Response) {
        try {
            const validatedId = await GetProductByIdSchema.validate(Req.params.id, {stripUnknown: true});

            if(validatedId) {
                const product = productService.getById(validatedId);
                if(product) {
                    Res.status(200).json(product);
                } else {
                    Res.status(400).json({message: "Nenhum produto com o id fornecido encontrado, verifique", error: true})
                }
            }
        } catch (error: any) {
            Res.status(400).json({...error.errors});
        }
    }

    findAll(Req: Request, Res: Response) {
        
        try {
            const products = productService.findAll();
            Res.status(200).json(products);
        } catch (error) {
            Res.status(400).json(error || "Algo deu errado no servidor");
        }
    }

    
    delete(Req: Request, Res: Response) {
        
    }
}

export default ProductController;