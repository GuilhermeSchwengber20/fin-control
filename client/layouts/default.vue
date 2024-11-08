<script lang="ts" setup>
import { RocketIcon } from '@radix-icons/vue';
import NavItem from '~/components/NavItem.vue';
</script>

<template>
    <div class="overflow-hidden">
        <header class="p-3 h-18 border border-b flex justify-between items-center">
            <div class="flex items-center gap-10">
                <nuxt-link to="/">
                    <div class="w-8 h-8 p-2 bg-primary flex items-center justify-center rounded-sm">
                        <RocketIcon class="text-white font-bold w-6 h-6" :stroke-width="1" />
                    </div>
                </nuxt-link>
                <nav class="flex items-center gap-5 ">  
                    <NavItem :label="'Contas'" :to="'/app/contas'" />
                    <NavItem :label="'Categorias'" :to="'/app/categorias'" />
                    <NavItem :label="'Dashboard'" :to="'/app/dashboard'" />
                    <!-- <NavItem :label="'Configurações'" :to="'/app/configuracao'" /> -->
                </nav>
            </div>
            <div>
                <UserMenu :username="'Guilherme'" />
            </div>
        </header>
        <slot />
    </div>

</template>