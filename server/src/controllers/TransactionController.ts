import { Request, Response } from "express";
import TransactionService from "../services/TransactionService";
import { TransactionSchema, GetByIdSchema } from "../schemas/TransactionSchema";

const transactionService = new TransactionService()

class TransactionController {
    constructor() {

    }

    async add(Req: Request, Res: Response) {
        try {

            const validatedTransaction = await TransactionSchema.validate(Req.body, {stripUnknown: true});

            if(validatedTransaction.isInstallment) {
                const result = transactionService.addInstallmentsTransaction(validatedTransaction);

                if(result?.id) {
                    Res.status(201).json(result);
                } else {
                    Res.status(400).json({message: "Erro ao cadastrar uma transfêrencia com parcelas, por favor tente novamente", error: true})
                }
            } else if (!validatedTransaction.isInstallment && !validatedTransaction.isRecurring) {
                const result = transactionService.addSingleTransaction(validatedTransaction);

                if(result?.id) {
                    Res.status(201).json(result);
                } else {
                    Res.status(400).json({message: "Erro ao cadastrar uma transfêrencia com parcelas, por favor tente novamente", error: true})
                }
            } else {
                // CONTA RECORRENTE
            }
            
        } catch (error: any) {
            Res.status(400).json({...error.errors});
        }
    }

    findAll(Req: Request, Res: Response) {
        try {
            const transactions = transactionService.findAll();
            Res.status(200).json(transactions);
            
        } catch (error) {
            Res.status(400).json("Algo deu errado!");
        }
    }

    async update(Req: Request, Res: Response) {
        try {
            const validatedTransaction = await TransactionSchema.validate(Req.body, {stripUnknown: true});

            if(validatedTransaction) {
                const updatedTransaction = transactionService.update(validatedTransaction);

                if(updatedTransaction !== -1) {
                    Res.status(200).json(updatedTransaction)
                } else {
                    Res.status(400).json({message: "Houve um problema para editar as transações por favor verifique", error: true})
                }
            }
        } catch(error: any) {
            Res.status(400).json({...error.errors});
        }
    }

    async getById(Req: Request, Res: Response) {
        try {
            const validatedId = await GetByIdSchema.validate(Req.params.id_transaction, {stripUnknown: true});

            if(validatedId) {
                const result = transactionService.getById(validatedId);

                if(result?.id) {
                    Res.status(200).json({...result});
                } else {
                    Res.status(400).json({message: "Erro ao buscar a transferência, por favor tente novamente", error: true})
                }
            }
        } catch (error: any) {
            Res.status(400).json({...error.errors});
        }
    }

    async delete(Req: Request, Res: Response) {
        try {
            const validatedId = await GetByIdSchema.validate(Req.params.id_transaction, {stripUnknown: true});
            
            if(validatedId) {
                const result = transactionService.delete(validatedId);

                if(result !== -1) {
                    Res.status(200).json({message: "Transação excluida com sucesso!", error: false});
                } else {
                    Res.status(400).json({message: "Erro ao excluir a transferência, por favor tente novamente.", error: true})
                }
            }

        } catch (error: any) {
            Res.status(400).json({...error.errors});
        }
    }
}

export default TransactionController;