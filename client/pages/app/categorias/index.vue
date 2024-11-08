<script  setup lang="ts">
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


import type { Category } from '~/schemas/CategorySchema';


const {
    categories,
    handleCopyCode,
    deleteCategory,
    fetchCategories,
    
} = useCategories();
await fetchCategories();



const handleEdit = (category: Category) => {
    navigateTo(`/app/categorias/${category.id}`);
};

</script>
<template>
    <div class="h-[90vh] w-full ">
        <h2 class="text-3xl font-bold pl-8 pt-8">
            / Categorias
        </h2>
        <div class="p-8">
            <div class="flex items-center gap-5">
                <Input placeholder="Filtrar categorias..." class="w-52" />
                <nuxt-link to="/app/categorias/-1" class="flex items-center gap-2 border border-dashed p-2 rounded-md cursor-pointer hover:bg-muted hover:transition-all">
                    <PlusCircledIcon class="text-muted-foreground"/>
                    <span class="text-sm text-muted-foreground">Adicionar</span>
                </nuxt-link>
            </div>
           <div class="border border-input mt-3 rounded-md h-[65vh] overflow-y-auto">
                <Table class="" v-if="categories">
                    <TableCaption>Lista de suas categorias cadastradas</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[50px]">
                                Código
                            </TableHead>
                            <TableHead class="w-[100px]">
                                Descrição
                            </TableHead>
                            <TableHead class="w-[25px]">
                                Tipo
                            </TableHead>
                            <TableHead class="w-[25px]">
                                Status
                            </TableHead>
                            <TableHead class="w-[25px]">
                                Ação
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="category in categories" :key="category.id">
                            <TableCell class="font-medium">
                                {{ category.id }}
                            </TableCell>
                            <TableCell class="font-medium">
                                {{ category.description }}
                            </TableCell>
                            <TableCell>
                                {{ category.type }}
                            </TableCell>
                            <TableCell>
                                <CheckCircledIcon
                                    class="text-green-500"
                                    v-if="category.status === 'active'"
                                />
                                <CrossCircledIcon
                                    class="text-red-500"
                                    v-if="category.status === 'inative'"
                                />
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
                                            <div class="flex items-center gap-2" @click="handleEdit(category)">
                                                <Pencil2Icon class="text-muted-foreground" />
                                                <span class="text-sm text-muted-foreground">Editar Categoria</span>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <div class="flex items-center gap-2" @click="handleCopyCode(category.id || '')">
                                                <LinkNone1Icon class="text-muted-foreground" />
                                                <span class="text-sm text-muted-foreground">Copiar Código</span>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <div class="flex items-center gap-2" @click="deleteCategory(category.id || '')">
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