import * as yup from "yup";

export const  CategorySchema = yup.object().shape({
    status: yup.string().oneOf(['active', 'inative']).required(),
    description: yup.string().required(),
    type: yup.string().oneOf(['expense', 'revenue']).required(),
    id: yup.string().uuid().nullable()
})


export const GetByIdSchema = yup.string().uuid().required();

export type Category = yup.InferType<typeof CategorySchema>;