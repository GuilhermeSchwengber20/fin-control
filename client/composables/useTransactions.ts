
import { reactive, ref } from 'vue';
import type { Transaction } from '~/schemas/TransactionSchema';
import { toast } from '@/components/ui/toast/use-toast'

const useTransactions = () => {
    const config = useRuntimeConfig();
    const transactions = ref<Transaction[]>([])
    
    const isInstallment = ref(false);
    const isRecurring = ref(false);
    const transactionUpdated = ref<Transaction | null>(null);

    const addTransaction = async (formValues: any) => {
        try {
            if(formValues.totalInstallments > 0) {
                formValues.transactionType = "installment";
                formValues.isInstallment = true;
            } else {
                formValues.transactionType = "single";
            }
            
            const parsedData = JSON.stringify(formValues);
            
            const res: Transaction = await $fetch(`${config.public.apiBaseUrl}/api/transactions`, {
                method: "POST",
                body: parsedData,
            })
            if(res.id) {
                toast({
                    title: 'Transação adicionada!',
                    description: 'A operação foi realizada com sucesso.',
                });
            } else {
                toast({
                    title: "Ops! Algo deu errado",
                    description: 'Ocorreu algum problema ao cadastrar a transação',
                });
            }


        } catch (error) {
            console.error(error);
        }

    };

    const updateTransaction = async (formValues: any) => {
        const parsedData = JSON.stringify(formValues);
        try {
            const res: Transaction = await $fetch(`${config.public.apiBaseUrl}/api/transactions`, {
                method: "PUT",
                body: parsedData,
            })
            if(res.id) {
                toast({
                    title: 'Transação adicionada!',
                    description: 'A operação foi realizada com sucesso.',
                });
            } else {
                toast({
                    title: "Ops! Algo deu errado",
                    description: 'Ocorreu algum problema ao cadastrar a transação',
                });
            }
        } catch (error: any) {
            toast({
                title: "Ops! algo deu errado",
                description: error.message
            })
        }

    }
    
    const handleCopyCode = async (idCategory: string) => {
        try {
          await navigator.clipboard.writeText(idCategory);
          toast({
            title: 'Código copiado!',
            description: 'O código da categoria foi copiado para a área de transferência.',
          });
        } catch (error) {
          console.error('Erro ao copiar o código:', error);
          toast({
            title: 'Erro ao copiar',
            description: 'Não foi possível copiar o código. Tente novamente.',
          });
        }
    }

    const deleteTransaction = async (id: string) => {
        const transactionIdx = transactions.value.findIndex(transaction => transaction.id === id);
        transactions.value.splice(transactionIdx, 1);

        try {
            const res: any = await $fetch(`${config.public.apiBaseUrl}/api/transactions/${id}`, {
                method: "DELETE"
            });
            
            if(res?.error) {
                toast({
                    title: "Sucesso! A transação foi excluida com êxito",
                    description: res?.message,
                })
            } else {
                toast({
                    title: "Ops! algo deu errado",
                    description: res.message
                })
            }

        } catch (error: any) {
            console.error(error);
            toast({
                title: "Ops! algo deu errado",
                description: error.message
            })

        }
    }

    const fetchTransactions = async () => {
        try {
            const { data, error: fetchError } = await useFetch<Transaction[]>(`${config.public.apiBaseUrl}/api/transactions`);
            if(fetchError.value) throw new Error(fetchError.value.message || "Erro desconhecido")
            transactions.value = data.value || [];
        } catch (error: any) {
            toast({
                title: "Ops! algo deu errado",
                description: error.message
            })
        }
    }

    const fetchSelectedTransaction = async (id: string) => {
        try {
            const { data, error: fetchError } = await useFetch<Transaction>(`${config.public.apiBaseUrl}/api/transactions/${id}`);
            if(fetchError.value) throw new Error(fetchError.value.message || "Erro desconhecido");

            transactionUpdated.value = data.value || null;
        } catch (error: any) {
            toast({
                title: "Ops! algo deu errado",
                description: error.message
            })
        }
    }

    return {
        isInstallment,
        isRecurring,
        transactions,
        addTransaction,
        fetchTransactions,
        updateTransaction,
        handleCopyCode,
        deleteTransaction,
        fetchSelectedTransaction,
        transactionUpdated
    }
}

export default useTransactions;