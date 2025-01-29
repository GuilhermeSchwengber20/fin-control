import * as z from 'zod'


export const RegisterUserSchema = z.object({
    id: z.string().uuid().nullable(),
    nome: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(4), // melhorar validacao e adicionar para fazer o match com o confirmPassword 
    confirmPassword: z.string().min(4),
})

export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type User = z.infer<typeof RegisterUserSchema>
export type UserLogin = z.infer<typeof LoginUserSchema>
