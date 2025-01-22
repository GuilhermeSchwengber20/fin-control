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
import type { Product } from '~/schemas/ProductSchema';
import useProducts from '~/composables/useProducts';


const {
    products,
    handleCopyCode,
    deleteProduct,

    fetchProducts
} = useProducts();

fetchProducts();

const handleEdit = async (product: Product) => {
    navigateTo(`/app/produtos/${product.id}`);
};

const convertToMoney = (value: number) => {
    return value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}

</script>
<template>
    <div class="h-[90vh] w-full ">
        <h2 class="text-3xl font-bold pl-8 pt-8">
            / Produtos
        </h2>
        <div class="p-8">
            <div class="flex items-center gap-5">
                <Input placeholder="Filtrar categorias..." class="w-52" />
                <nuxt-link to="/app/produtos/-1" class="flex items-center gap-2 border border-dashed p-2 rounded-md cursor-pointer hover:bg-muted hover:transition-all">
                    <PlusCircledIcon class="text-muted-foreground"/>
                    <span class="text-sm text-muted-foreground">Adicionar</span>
                </nuxt-link>
            </div>
           <div class="border border-input mt-3 rounded-md h-[65vh] overflow-y-auto">
                <Table class="">
                    <TableCaption>Lista de seus produtos cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[150px]">
                                Descrição
                            </TableHead>
                            <TableHead class="w-[150px]">
                                $ Custo
                            </TableHead>
                            <TableHead class="w-[100px]">
                                $ Saída
                            </TableHead>
                            <TableHead class="w-[100px]">
                                Estoque
                            </TableHead>
                            <TableHead class="w-[100px]">
                               Ação
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="product in products" :key="product.id">
                            <TableCell class="font-medium">
                              {{ product.id }}
                            </TableCell>
                            <TableCell class="font-medium">
                                {{ product.description }}
                            </TableCell>
                            <TableCell class="font-medium">
                                {{ convertToMoney(product.cost) }}
                            </TableCell>
                            <TableCell class="font-medium">
                                {{ convertToMoney(product.amount) }}
                            </TableCell>
                            <TableCell class="font-medium">
                                {{ product.stock }}
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
                                            <div class="flex items-center gap-2" @click="handleEdit(product)">
                                                <Pencil2Icon class="text-muted-foreground" />
                                                <span class="text-sm text-muted-foreground">Editar Produto</span>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <div class="flex items-center gap-2" @click="handleCopyCode(product.id || '')">
                                                <LinkNone1Icon class="text-muted-foreground" />
                                                <span class="text-sm text-muted-foreground">Copiar Código</span>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <div class="flex items-center gap-2" @click="deleteProduct(product.id || '')">
                                                <TrashIcon class="text-muted-foreground" />
                                                <span class="text-sm text-muted-foreground">Excluir Produto</span>
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