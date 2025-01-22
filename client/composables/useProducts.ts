import type { Product } from '~/schemas/ProductSchema.ts';
import { toast } from '@/components/ui/toast/use-toast'
import { ref } from 'vue';



const useProducts = () => {
    const config = useRuntimeConfig();
    const products = ref<Product[]>([]);
    const updatedProduct = ref<Product | null>(null);

    const error = ref<string | null>(null);
    const API_PATH = `${config.public.apiBaseUrl}/api/products`;
    
    const addProduct = async (formValues: any) => {
        const parsedData = JSON.stringify(formValues);
        const res: Product = await $fetch(API_PATH, {
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

    const updateProduct = async (formValues: any) => {
        const parsedData = JSON.stringify(formValues);
        const res: Product = await $fetch(API_PATH, {
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

    const deleteProduct = async (id: string) => {
        try {

            // como melhorar isso aqui
            type BasicResponseAPI = {
                message: string
            }
            const {message} = await $fetch<BasicResponseAPI>(`${API_PATH}/${id}`, {
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
            await fetchProducts();
        }
        
    }

    const fetchProducts = async () => {
        try {
            const { data, error: fetchError } = await useFetch<Product[]>(API_PATH);
            if(fetchError.value) throw new Error(fetchError.value.message || "Erro desconhecido!");
            products.value = data.value || [];
            
        } catch (err: any) {
            error.value = err.message || "Erro ao carregar categorias";
        }
    }

    const fetchSelectedProduct = async (id: string) => {
        try {
            const { data, error: fetchError } = await useFetch<Product>(`${API_PATH}/${id}`);
            if(fetchError.value) throw new Error(fetchError.value.message || "Erro desconhecido");

            updatedProduct.value = data.value || null;
        } catch (error: any) {
            toast({
                title: "Ops! algo deu errado",
                description: error.message
            })
        }
    }

  
  

    return {
        products,
        addProduct,
        updateProduct,
        handleCopyCode,
        deleteProduct,
        fetchProducts,
        fetchSelectedProduct,
        updatedProduct
    }

};

export default useProducts;