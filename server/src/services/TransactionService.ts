import type { Transaction } from "../schemas/TransactionSchema";
import InMemoryTransactionRepository from "../repositories/inMemory/InMemoryTransactionRepository";

const inMemoryTransactionRepository = new InMemoryTransactionRepository();
import { v4 as uuidv4 } from 'uuid';

class TransactionService {

    constructor() {

    }

    getById(id: string) {
        const savedTransaction = inMemoryTransactionRepository.getById(id as string);

        return savedTransaction;
    }

    addSingleTransaction(transaction: Transaction) {
        const savedTransaction = inMemoryTransactionRepository.add({...transaction, id: uuidv4()});

        return savedTransaction;
    }

    addInstallmentsTransaction(transaction: Transaction) {

        if(transaction.totalInstallments) {
            transaction.totalInstallments = Number(transaction.totalInstallments);
            const parentTransaction = inMemoryTransactionRepository.add({
                ...transaction,
                totalInstallments: transaction.totalInstallments,
                installmentNumber: undefined,
                id: uuidv4(),
            })

            for(let i = 0; i < Number(transaction.totalInstallments); i++) {
                inMemoryTransactionRepository.add({
                    ...transaction,
                    dueDate: this.generateDueDate(transaction.dueDate, i), // nesse caso em conta parcelada dueDate sera considerado o primeiro pagamento
                    installmentNumber: i + 1,
                    amount: this.calculateAmountInstallment(transaction.amount, transaction.totalInstallments), // nesse caso amount é o total da transação
                    parentTransactionId: parentTransaction.id,
                    id: uuidv4()
                })
            }

            return parentTransaction;
        }
    }

    calculateAmountInstallment(amount: number, totalInstallments: number): number {
        const installmentAmount = amount / totalInstallments;
        return installmentAmount;
    }

    generateDueDate(firstDueDate: string, idx: number): string {
        const [year, month, day] = firstDueDate.split("-").map(Number);
        const dueDate = new Date(year, month - 1, day);
        dueDate.setMonth(dueDate.getMonth() + idx);  // Adiciona o índice ao mês
        return dueDate.toISOString().split("T")[0];
    }  
     
    findAll(): Transaction[] {
        const transactions = inMemoryTransactionRepository.findAll();
        return transactions;
    }

    update(transaction: Transaction): number {
        const updatedTransaction = inMemoryTransactionRepository.update(transaction);

        return updatedTransaction;
    }

    delete(id: string) {
        const idxDeleted = inMemoryTransactionRepository.delete(id);

        return idxDeleted;
    }
    
}

export default TransactionService