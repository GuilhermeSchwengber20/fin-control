<script setup lang="ts">
import { Separator } from '~/components/ui/separator';
import { Button } from '~/components/ui/button';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'vee-validate';
import { toast } from '@/components/ui/toast/use-toast'

import { toTypedSchema } from '@vee-validate/zod'
import { TransactionSchema } from '~/schemas/TransactionSchema';
const formSchema = toTypedSchema(TransactionSchema);

import { useRoute } from "vue-router"

const route = useRoute();

const {
    addProduct,
    updateProduct,
    updatedProduct,
    fetchSelectedProduct
    // addTransaction,
    // updateTransaction,
    // fetchSelectedTransaction,
    // transactionUpdated
} = useProducts();

const menus = ['Geral'];

const activeMenu = ref(0);

const setActiveMenu = (index: any) => {
    activeMenu.value = index
}

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: formSchema,
});


onMounted(() => {
    nextTick(() => {
        if(updatedProduct?.value) {
            // setFieldValue("id", updatedProduct?.value?.id);
            // setFieldValue("description", updatedProduct?.value?.description);
            // setFieldValue("cost", updatedProduct?.value?.cost);
            // setFieldValue("amount", updatedProduct?.value?.amount);
            // setFieldValue("stock", updatedProduct?.value?.stock);


            // setFieldValue("type", updatedProduct?.value?.type || "expense");
            // setFieldValue("id_category", updatedProduct?.value?.id_category || "");
            // setFieldValue("amount", updatedProduct?.value?.amount ? updatedProduct.value.amount.toFixed(2).replace(".", ",") : "");
            // setFieldValue("isInstallment", updatedProduct?.value?.isInstallment || false);
            // setFieldValue("isRecurring", updatedProduct?.value?.isRecurring || false);
            // setFieldValue("createdAt", updatedProduct?.value?.createdAt || "");
            // setFieldValue("dueDate", updatedProduct?.value?.dueDate || "");
            // setFieldValue("status", updatedProduct?.value?.status || "");
            // setFieldValue("totalInstallments", updatedProduct?.value?.totalInstallments || 1);
        }
    });
})


if(route.params.id !== "-1") {
    fetchSelectedProduct(route.params.id as string);
}


const onSubmit = handleSubmit(async (formValues) => {
  try {
    if (route.params.id !== "-1") {
      await updateProduct(formValues);
    } else {
        console.log("aqui?");
      await addProduct(formValues);
    }
    resetForm();
    navigateTo("/app/produtos");
  } catch (error: any) {
    console.error(error);
    toast({
      title: 'Algo deu errado!',
      description: error.message,
    });
  }
});

const handleCancelEdit = () => {
    navigateTo("/app/contas")
}

</script>
<template>
    <main class="px-10 py-3 h-[90vh]">
        <div>
            <h2 class="font-bold text-2xl">Cadastro de produtos</h2>
            <p class="text-muted-foreground mt-1 mb-5 font-medium">Gerencie e modifique seus produtos de sua prefêrencia</p>
        </div>
        <Separator />
        <div class="flex gap-10 mt-5 overflow-y-auto h-[72vh]">
            <div class="w-56">
                <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                    <a 
                        v-for="(menu, index) in menus"
                        :key="index"
                        :class="[
                            'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 w-full text-left justify-start hover:bg-muted',
                            activeMenu === index ? 'bg-muted' : ''
                        ]"
                        @click="setActiveMenu(index)"
                    >
                        {{ menu }}
                    </a>
                </nav>
            </div>
            <div class="w-2/4 ">
                <div v-if="activeMenu === 0">
                    <h2 class="font-bold text-xl">Geral</h2>
                    <p class="text-muted-foreground">Informações gerais sobre o produto</p>
                </div>
                <Separator class="mt-3" />
                <form class="mt-3 flex flex-col gap-3">
                    <div class="hidden">
                        <FormField v-slot="{ field }" name="id">
                            <FormItem>
                                <FormLabel>Código</FormLabel>
                                <FormControl>
                                    <Input
                                        v-bind="field"
                                        autocomplete="off"
                                        placeholder=""
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                    <FormField v-slot="{ field }" name="description">
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Input
                                    v-bind="field"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Ex: Perfume One million"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ field }" name="cost">
                        <FormItem>
                            <FormLabel>$ Custo</FormLabel>
                            <FormControl>
                                <Input
                                    v-bind="field"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Ex: 250,00"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ field }" name="amount">
                        <FormItem>
                            <FormLabel>$ Saída</FormLabel>
                            <FormControl>
                                <Input
                                    v-bind="field"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Ex: 250,00"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ field }" name="stock">
                        <FormItem>
                            <FormLabel>Estoque</FormLabel>
                            <FormControl>
                                <Input
                                    v-bind="field"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Ex: 1"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    
                    <div class="flex gap-2 mt-2">
                        <Button
                            @click="onSubmit"
                        >
                            Salvar
                        </Button>
                        <Button
                            class="bg-background text-black"
                            @click="handleCancelEdit"
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>