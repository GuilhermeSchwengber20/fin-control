import * as z from 'zod'

export const CategorySchema = z.object({
    id: z.string().optional(),
    description: z.string({required_error: "Este campo é obrigatório"}).min(3, {message: "Descrição precisa ter mais de 3 caracteres"}),
    type: z.enum(["revenue", "expense"], {
        required_error: "Este campo é obrigatório",
        invalid_type_error: "O tipo deve ser 'Despesa' ou 'Receita'"
    }),
    status: z.enum(['active', 'inative'], {
        required_error: "Este campo é obrigatório",
        invalid_type_error: "O status deve ser 'ativo' ou 'inativo'",
    }).nullable(),
})

export type Category = z.infer<typeof CategorySchema>
