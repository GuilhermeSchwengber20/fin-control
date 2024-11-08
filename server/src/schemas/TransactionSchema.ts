import * as yup from "yup";

export const TransactionSchema = yup.object().shape({
    id: yup.string().uuid().nullable(),
    description: yup.string().required(),
    id_category: yup.string().uuid().required(),
    amount: yup
        .number()
       .required(),
    dueDate: yup.string().required(), // lembrar de mudar essa validação e começar a utilizar dueDate como data
    status: yup.string().oneOf(['paid', 'pending', 'canceled']).required(),
    type: yup.string().oneOf(['expense', 'revenue']).required(),


    // ABAIXO SOMENTE SE FOR PARCELADO E FUTURAMENTE SE FOR RECORRENTE
    // LEMBRAR DE ADICIONAR CREATED AT E UPDATED AT QUANDO ESTIVER COM BANCO DE DADOS
    isRecurring: yup.boolean().notRequired(),
    isInstallment: yup.boolean().notRequired(),
    installmentNumber: yup.number().notRequired(),
    totalInstallments: yup.number().notRequired(),
    parentTransactionId: yup.string().uuid().notRequired(),


    createdAt: yup.string().nullable(),
    updatedAt: yup.string().nullable(),

})

export const  GetByIdSchema = yup.string().uuid().required("ID é obrigatório");

export type Transaction = yup.InferType<typeof TransactionSchema>;