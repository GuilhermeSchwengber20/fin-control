import type { Transaction } from "../../schemas/TransactionSchema";

class InMemoryTransactionRepository {
    transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    add(transaction: Transaction): Transaction {
        this.transactions.push(transaction);
        return transaction;
    }

    findAll() {
        return this.transactions.filter(transaction => {
            const isParentTransaction = transaction.isInstallment && !transaction.parentTransactionId;
            return !isParentTransaction;
        });
    }

    update(transaction: Transaction) {
        const idxTrans = this.transactions.findIndex(t => t.id === transaction.id);
        if(idxTrans !== -1) {
            this.transactions.splice(idxTrans, 1, transaction);
        }
        return idxTrans;
    }

    getById(id: string): Transaction {
        const idxTrans = this.transactions.findIndex(t => t.id === id);
        return this.transactions[idxTrans];
    }


    delete(id: string) {
        const idxTrans = this.transactions.findIndex(t => t.id === id);
        this.transactions.splice(idxTrans, 1);
        return idxTrans;
    }
}

export default InMemoryTransactionRepository;