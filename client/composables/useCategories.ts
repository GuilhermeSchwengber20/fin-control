import type { Category } from '~/schemas/CategorySchema';
import { toast } from '@/components/ui/toast/use-toast'
import { ref } from 'vue';



const useCategories = () => {
    const config = useRuntimeConfig();
    const categories = ref<Category[]>([])

    const isEditing = ref(false);
    const isOpen = ref(false);
    const pending = ref<boolean>(false)
    const error = ref<string | null>(null);
    
    
    const addCategory = async (formValues: any) => {
        const parsedData = JSON.stringify(formValues);
        const res: Category = await $fetch(`${config.public.apiBaseUrl}/api/categories`, {
            method: "POST",
            body: parsedData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        if(res.id) {
            toast({
                title: 'Categoria adicionada!',
                description: 'A operação foi realizada com sucesso.',
            });
        } else {
            toast({
                title: "Ops! Algo deu errado",
                description: 'Ocorreu algum problema ao cadastrar a categoria',
            });
        }
    };

    const updateCategory = async (formValues: any) => {
        const parsedData = JSON.stringify(formValues);
        const res: Category = await $fetch(`${config.public.apiBaseUrl}/api/categories`, {
            method: "PUT",
            body: parsedData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if(res.id) {
            toast({
                title: 'Categoria alterada com sucesso!',
                description: 'A operação foi realizada com sucesso.',
            });
        } else {
            toast({
                title: "Ops! Algo deu errado",
                description: 'Ocorreu algum problema ao editar a categoria',
            });
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
    };

    const deleteCategory = async (id: string) => {
        try {

            // como melhorar isso aqui
            type BasicResponseAPI = {
                message: string
            }
            const {message} = await $fetch<BasicResponseAPI>(`${config.public.apiBaseUrl}/api/categories/${id}`, {
                method: "DELETE"
            })
            
            if(message === "Categoria deletada com sucesso!") {
                toast({
                    title: "Sucesso ao deletar!",
                    description: message,
                })
            }
        } catch (error: any) {
            toast({
                title: 'Erro ao deletar',
                description: error.message || 'Não foi possível copiar o código. Tente novamente.',
            });
        } finally {
            await fetchCategories();
        }
        
    }

    const fetchCategories = async () => {
        pending.value = true;
        try {
            const { data, error: fetchError } = await useFetch<Category[]>(`${config.public.apiBaseUrl}/api/categories`);
            if(fetchError.value) throw new Error(fetchError.value.message || "Erro desconhecido!");
            categories.value = data.value || [];
            
        } catch (err: any) {
            error.value = err.message || "Erro ao carregar categorias";
        } finally {
            pending.value = false;
        }
    }

  
  

    return {
        categories,
        isEditing,
        isOpen,
        pending,
        addCategory,
        updateCategory,
        handleCopyCode,
        deleteCategory,
        fetchCategories,
    }

};

export default useCategories;