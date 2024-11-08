<script setup lang="ts">
import { PersonIcon } from '@radix-icons/vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps({
    username: {
        type: String,
        required: true,
    }
})
</script>
<template>
<div class="w-8 h-8 bg-secondary flex items-center justify-center rounded-sm shadow-sm">
    <DropdownMenu>
        <DropdownMenuTrigger>
            <PersonIcon class="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{{ username }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                Tema
            </DropdownMenuItem>
            <DropdownMenuItem>
                Configurar
            </DropdownMenuItem>
            <DropdownMenuItem>
                Sair
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</div>

</template>