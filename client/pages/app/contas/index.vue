<script lang="ts" setup>
import { PlusCircledIcon } from '@radix-icons/vue';
import { CheckCircledIcon } from '@radix-icons/vue';
import { CrossCircledIcon } from '@radix-icons/vue';
import { DotsHorizontalIcon } from '@radix-icons/vue';
import { Pencil2Icon } from '@radix-icons/vue';
import { LinkNone1Icon } from '@radix-icons/vue';
import { TrashIcon } from '@radix-icons/vue';
import { Input } from '~/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Transaction } from '~/schemas/TransactionSchema';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod'
import { TransactionSchema } from '~/schemas/TransactionSchema';
const formSchema = toTypedSchema(TransactionSchema);

const {
    categories,
    fetchCategories
} = useCategories();

const {
    transactions,
    handleCopyCode,
    deleteTransaction,

    fetchTransactions
} = useTransactions();



fetchTransactions();
fetchCategories();

const handleEdit = async (transaction: Transaction) => {
    navigateTo(`/app/contas/${transaction.id}`);
};

const convertDate = (date: string) => {
    return date.split("-").reverse().join("/");
}

const convertToMoney = (value: number) => {
    return value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}

</script>
<template>
    <div class="h-[90vh] w-full ">
        <h2 class="text-3xl font-bold pl-8 pt-8">
            / Contas
        </h2>
        <div class="p-8">
            <div class="flex items-center gap-5">
                <Input placeholder="Filtrar categorias..." class="w-52" />
                <nuxt-link to="/app/contas/-1" class="flex items-center gap-2 border border-dashed p-2 rounded-md cursor-pointer hover:bg-muted hover:transition-all">
                    <PlusCircledIcon class="text-muted-foreground"/>
                    <span class="text-sm text-muted-foreground">Adicionar</span>
                </nuxt-link>
            </div>
           <div class="border border-input mt-3 rounded-md h-[65vh] overflow-y-auto">
                <Table class="">
                    <TableCaption>Lista de suas transações cadastradas</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[150px]">
                                Descrição
                            </TableHead>
                            <TableHead class="w-[150px]">
                                Categoria
                            </TableHead>
                            <TableHead class="w-[100px]">
                                Tipo
                            </TableHead>
                            <TableHead class="w-[150px]">
                                Valor Total
                            </TableHead>
                            <TableHead class="w-[100px]">
                                Status
                            </TableHead>
                            <TableHead class="w-[100px]">
                                Vencimento
                            </TableHead>
                            <TableHead class="w-[100px]">
                                Parcelas
                            </TableHead>
                            <TableHead class="w-[100px]">
                               Ação
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="transaction in transactions" :key="transaction.id">
                            <TableCell class="font-medium">
                                {{ transaction.description }}
                            </TableCell>
                            <TableCell>
                                {{ categories.find(cat => cat.id === transaction.id_category)?.description || "" }}
                            </TableCell>
                            <TableCell>
                                {{ transaction.type === "expense" ? "Despesa" : "Receita" }}
                            </TableCell>
                            <TableCell>
                                {{ convertToMoney(transaction.amount) }}
                            </TableCell>
                            <TableCell>
                                {{ 
                                    transaction.status === "pending" ? "Pendente" 
                                    : transaction.status === "paid" ? "Pago" :
                                    "Cancelada"
                                }}
                            </TableCell>
                            <TableCell>
                                {{ convertDate(transaction.dueDate) }}
                            </TableCell>
                            <TableCell>
                                <span v-if="(transaction.totalInstallments || 0) > 1 && transaction.isInstallment">
                                    {{ transaction.installmentNumber }} /
                                </span>
                                {{ transaction.totalInstallments || 1 }}
                            </TableCell>
                            
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <DotsHorizontalIcon />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <div class="flex items-center gap-2" @click="handleEdit(transaction)">
                                                <Pencil2Icon class="text-muted-foreground" />
                                                <span class="text-sm text-muted-foreground">Editar Categoria</span>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <div class="flex items-center gap-2" @click="handleCopyCode(transaction.id || '')">
                                                <LinkNone1Icon class="text-muted-foreground" />
                                                <span class="text-sm text-muted-foreground">Copiar Código</span>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <div class="flex items-center gap-2" @click="deleteTransaction(transaction.id || '')">
                                                <TrashIcon class="text-muted-foreground" />
                                                <span class="text-sm text-muted-foreground">Excluir Categoria</span>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
           </div>
        </div>
    </div>
</template>