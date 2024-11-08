<script setup lang="ts">
    const props = defineProps({
        to: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    })
</script>
<template>
    <nuxt-link :to="to">
        <li class="list-none cursor-pointer hover:text-primary hover:border-b hover:border-primary hover:transition-all hover:delay-100 hover:ease-out">
            {{ label }}
        </li>
    </nuxt-link>
</template>