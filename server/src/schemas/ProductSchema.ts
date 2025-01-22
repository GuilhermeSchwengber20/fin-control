import * as yup from "yup";

export const  ProductSchema = yup.object().shape({
    id: yup.string().uuid().nullable(),
    description: yup.string().required(),
    amount: yup.number().required(),
    cost: yup.number().required(),
    stock: yup.number().required(),
})


export const GetProductByIdSchema = yup.string().uuid().required();

export type Product = yup.InferType<typeof ProductSchema>;