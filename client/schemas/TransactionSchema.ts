import * as z from 'zod'

export const TransactionSchema = z.object({
    id: z.string().optional(),
    description: z.string({required_error: "Este campo é obrigatório"}).min(5, {message: "Descrição precisa ter mais de 5 caracteres"}),
    id_category: z.string(),
    type: z.enum(['revenue', 'expense']),
    status: z.enum(['paid', 'pending', 'canceled']),
    totalInstallments: z.number().optional(),
    amount: z.string()
    .regex(/^\d+,\d{2}$/, "O valor deve estar no formato brasileiro, ex: 350,00")
    .transform(value => value.replace(",", "."))
    .transform(value => parseFloat(value)),
    dueDate: z.string(),
    // budget: z.number().multipleOf(0.01),
    // mudar para amount
    isInstallment: z.boolean().default(false).optional(),
    createdAt: z.string().optional(),
    // createdAt: z.date().default(() => new Date()),
    // firstDueDate: z.union([z.date(), z.null()]).optional(),
    // installmentsCount: z.number().int().positive().nullable().optional(),
    isRecurring: z.boolean().default(false),
    installmentNumber: z.number().default(0).optional()
    
})




export type Transaction = z.infer<typeof TransactionSchema>