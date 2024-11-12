<script lang="ts" setup>
import { RocketIcon } from '@radix-icons/vue';
</script>

<template>
    <div class="overflow-hidden">
        <header class="p-3 h-18 border border-b flex justify-between items-center">
            <div class="flex items-center gap-10">
                <div class="w-8 h-8 p-2 bg-primary flex items-center justify-center rounded-sm">
                    <RocketIcon class="text-white font-bold w-6 h-6" :stroke-width="1" />
                </div>
            </div>
        </header>
        <slot />
    </div>

</template>