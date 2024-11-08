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
import  { CategorySchema } from '~/schemas/CategorySchema';
const formSchema = toTypedSchema(CategorySchema);

import { useRoute } from "vue-router"

const route = useRoute();

const {
    fetchCategories,
    updateCategory,
    addCategory,
} = useCategories();

const menus = ['Geral',];

const activeMenu = ref(0);

const setActiveMenu = (index: any) => {
    activeMenu.value = index
}

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: formSchema,
});


onMounted(() => {
    // nextTick(() => {
    //     setFieldValue("description", category?.description);
    //     setFieldValue("id", category?.id);
    //     setFieldValue("type", category?.type || "Despesa");
    //     setFieldValue("status", category?.status || "inativo");
    // });
    // nextTick(() => {
    //     if(transactionUpdated?.value) {
    //         setFieldValue("description", transactionUpdated?.value?.description);
    //         setFieldValue("id", transactionUpdated?.value?.id);
    //         setFieldValue("type", transactionUpdated?.value?.type || "expense");
    //         setFieldValue("id_category", transactionUpdated?.value?.id_category || "");
    //         setFieldValue("amount", transactionUpdated?.value?.amount ? transactionUpdated.value.amount.toFixed(2).replace(".", ",") : "");
    //         setFieldValue("isInstallment", transactionUpdated?.value?.isInstallment || false);
    //         setFieldValue("isRecurring", transactionUpdated?.value?.isRecurring || false);
    //         setFieldValue("createdAt", transactionUpdated?.value?.createdAt || "");
    //         setFieldValue("dueDate", transactionUpdated?.value?.dueDate || "");
    //         setFieldValue("status", transactionUpdated?.value?.status || "");
    //         setFieldValue("totalInstallments", transactionUpdated?.value?.totalInstallments || 1);
    //     }
    // });
})

fetchCategories();
if(route.params.id !== "-1") {
    // fetchSelectedTransaction(route.params.id as string);
}


const onSubmit = handleSubmit(async (formValues) => {
  try {
    if (route.params.id !== "-1") {
      await updateCategory(formValues);
    } else {
      await addCategory(formValues);
    }
    resetForm();
    navigateTo("/app/categorias");
  } catch (error: any) {
    console.error(error);
    toast({
      title: 'Algo deu errado!',
      description: error.message,
    });
  }
});

const handleCancelEdit = () => {
    navigateTo("/app/categorias")
}

</script>
<template>
    <main class="px-10 py-3 h-[90vh]">
        <div>
            <h2 class="font-bold text-2xl">Cadastro de categorias</h2>
            <p class="text-muted-foreground mt-1 mb-5 font-medium">Gerencie e modifique suas categorias de sua prefêrencia</p>
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
                    <p class="text-muted-foreground">Informações gerais sobre a transação</p>
                </div>
                <Separator class="mt-3" />
                <form class="mt-3 flex flex-col gap-2">
                    <div class="hidden">
                        <FormField v-slot="{ field }" name="id">
                            <FormItem>
                                <FormLabel>Código</FormLabel>
                                <FormControl>
                                    <Input v-bind="field" placeholder="Ex: CAT001" readonly />
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
                                    autocomplete="off"
                                    placeholder="Ex: Contas..."
                                    ref="inputDescription"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="type">
                        <FormItem>
                            <FormLabel>Tipo</FormLabel>

                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um tipo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="expense">
                                            Despesa
                                        </SelectItem>
                                        <SelectItem value="revenue">
                                            Receita
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="status">
                        <FormItem>
                            <FormLabel>Status</FormLabel>

                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="act
                                        
                                        
                                        
                                        
                                        
                                        ive">
                                            ativo
                                        </SelectItem>
                                        <SelectItem value="inative">
                                            inativo
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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