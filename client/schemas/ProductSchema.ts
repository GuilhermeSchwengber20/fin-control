import * as z from 'zod'

export const ProductSchema = z.object({
    id: z.string().optional(),
    description: z.string({required_error: "Este campo é obrigatório"}).min(3, {message: "Descrição precisa ter mais de 3 caracteres"}),

    cost: z.string()
    .regex(/^\d+,\d{2}$/, "O valor de custo deve estar no formato brasileiro, ex: 350,00")
    .transform(value => value.replace(",", "."))
    .transform(value => parseFloat(value)),

    amount: z.string()
    .regex(/^\d+,\d{2}$/, "O valor deve estar no formato brasileiro, ex: 350,00")
    .transform(value => value.replace(",", "."))
    .transform(value => parseFloat(value)),


    stock: z.string()
    .regex(/^\d+,\d{2}$/, "O valor deve estar no formato brasileiro, ex: 350,00")
    .transform(value => value.replace(",", "."))
    .transform(value => parseFloat(value)),
    
    
})




export type Product = z.infer<typeof ProductSchema>