export type Transaction = {
    id?: string;                    // Identificador único da transação
    description: string;            // Descrição da transação
    id_category: string;            // Identificador da categoria
    amount: number;                 // Valor da transação
    dueDate: string;                // Data de vencimento
    status: 'paid' | 'pending' | 'canceled';  // Status atual da transação
    isRecurring?: boolean;           // Indica se a transação é recorrente
    isInstallment?: boolean;
    recurrencePeriod?: 'monthly' | 'weekly' | 'yearly'; // Frequência da recorrência (se for recorrente)
    installmentNumber?: number;     // Número da parcela (se for uma transação parcelada)
    totalInstallments?: number;     // Total de parcelas (para controle de transações parceladas)
    paymentDate?: string;           // Data de pagamento (se a transação foi paga)
    createdAt?: string;              // Data de criação da transação
    updatedAt?: string;              // Data da última atualização
    parentTransactionId?: string; 
    type: 'expense' | 'revenue';
}