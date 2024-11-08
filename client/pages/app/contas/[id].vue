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
    categories,
    fetchCategories
} = useCategories();

const {
    addTransaction,
    updateTransaction,
    fetchSelectedTransaction,
    transactionUpdated
} = useTransactions();

const menus = ['Geral', 'Parcelamento'];

const activeMenu = ref(0);

const setActiveMenu = (index: any) => {
    activeMenu.value = index
}

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: formSchema,
});


onMounted(() => {
    nextTick(() => {
        if(transactionUpdated?.value) {
            setFieldValue("description", transactionUpdated?.value?.description);
            setFieldValue("id", transactionUpdated?.value?.id);
            setFieldValue("type", transactionUpdated?.value?.type || "expense");
            setFieldValue("id_category", transactionUpdated?.value?.id_category || "");
            setFieldValue("amount", transactionUpdated?.value?.amount ? transactionUpdated.value.amount.toFixed(2).replace(".", ",") : "");
            setFieldValue("isInstallment", transactionUpdated?.value?.isInstallment || false);
            setFieldValue("isRecurring", transactionUpdated?.value?.isRecurring || false);
            setFieldValue("createdAt", transactionUpdated?.value?.createdAt || "");
            setFieldValue("dueDate", transactionUpdated?.value?.dueDate || "");
            setFieldValue("status", transactionUpdated?.value?.status || "");
            setFieldValue("totalInstallments", transactionUpdated?.value?.totalInstallments || 1);
        }
    });
})

fetchCategories();
if(route.params.id !== "-1") {
    fetchSelectedTransaction(route.params.id as string);
}


const onSubmit = handleSubmit(async (formValues) => {
  try {
    if (route.params.id !== "-1") {
      await updateTransaction(formValues);
    } else {
      await addTransaction(formValues);
    }
    resetForm();
    navigateTo("/app/contas");
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
            <h2 class="font-bold text-2xl">Cadastro de transações</h2>
            <p class="text-muted-foreground mt-1 mb-5 font-medium">Gerencie e modifique suas transações de sua prefêrencia</p>
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
                <div v-if="activeMenu === 1">
                    <h2 class="font-bold text-xl">Parcelamento</h2>
                    <p class="text-muted-foreground">Informações sobre transações parceladas</p>
                </div>
                <Separator class="mt-3" />
                <form class="mt-3 flex flex-col gap-3">
                    <div :class="activeMenu === 0 ? 'hidden' : ''">
                        <div class="hidden">
                            <FormField v-slot="{ field }" name="createdAt">
                                <FormItem>
                                    <FormLabel>Data criação</FormLabel>
                                    <FormControl>
                                        <Input
                                            v-bind="field"
                                            autocomplete="off"
                                            placeholder=""
                                            type="date"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </div>
                        <FormField v-slot="{ field }" name="totalInstallments">
                            <FormItem>
                                <FormLabel>Qtd. Parcelas</FormLabel>
                                <FormControl>
                                    <Input
                                        v-bind="field"
                                        type="number"
                                        autocomplete="off"
                                        placeholder="Ex: 5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                    <div :class="activeMenu === 1 ? 'hidden' : ''">
                        <div class="hidden"> <!-- hidden para esconder campos que nao precisa mostrar no form -->
                            <FormField v-slot="{ field }" name="id">
                                <FormItem>
                                    <FormLabel>Código</FormLabel>
                                    <FormControl>
                                        <Input v-bind="field" placeholder="Ex: TRNAS0141" readonly />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </div>
                        <FormField v-slot="{ field }" name="description">
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input v-bind="field" autocomplete="off" placeholder="Ex: Contas..." />
                                </FormControl>
                                <!-- <FormDescription>
                                    Insira uma boa descrição da transação
                                </FormDescription> -->
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="id_category">
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <Select v-bind="componentField">
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione uma categoria" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <!-- <FormDescription>
                                        Vincule uma categoria a transação
                                    </FormDescription> -->
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem
                                                v-for="category in categories"
                                                :key="category.id"
                                                :value="`${category.id || ''}`"
                                            >
                                                {{ category.description }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
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
                                    <!-- <FormDescription>
                                        Informe o tipo da transação
                                    </FormDescription> -->
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
                                    <!-- <FormDescription>
                                        Indique o status que a transação se encontra
                                    </FormDescription> -->
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="paid">
                                                Pago
                                            </SelectItem>
                                            <SelectItem value="pending">
                                                Pendente
                                            </SelectItem>
                                            <SelectItem value="canceled">
                                                Cancelada
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ field }" name="amount">
                            <FormItem>
                                <FormLabel>Valor total</FormLabel>
                                <FormControl>
                                    <Input
                                        v-bind="field"
                                        autocomplete="off"
                                        placeholder="Ex: 198,90"
                                    />
                                </FormControl>
                                <!-- <FormDescription>
                                    Insira o valor da transação
                                </FormDescription> -->
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ field }" name="dueDate">
                            <FormItem>
                                <FormLabel>Vencimento</FormLabel>
                                <FormControl>
                                    <Input
                                        v-bind="field"
                                        autocomplete="off"
                                        placeholder="Insira a data"
                                        type="date"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Insira o vencimento, em caso de parcelamento será considerado como 1° vencimento
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        
                    </div>
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