<script setup lang="ts">
definePageMeta({
    layout: "authenticate"
})
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'

import { LoginUserSchema } from "@/schemas/UserSchema.js"
import { toTypedSchema } from '@vee-validate/zod'

import { useForm } from 'vee-validate';

const formSchema = toTypedSchema(LoginUserSchema);

const { login } = useAuth();

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: formSchema,
});


const onSubmit = handleSubmit(async (formValues) => {
    try {
        login(formValues);
    } catch (error: any) {

    }
});
</script>

<template>
  <main class="w-screen h-[90vh] flex items-center justify-center">
    <div>
        <Card class="w-[325px]">
            <CardHeader>
                <CardTitle>Bem vindo ao Fin Control</CardTitle>
                <CardDescription>Cadastre-se ou faça login</CardDescription>
            </CardHeader>
            <form>
                <CardContent class="flex flex-col gap-3">
                    <div>
                        <FormField v-slot="{ field }" name="email">
                            <FormItem>
                                <FormLabel>Email</FormLabel>
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
                    <div>
                        <FormField v-slot="{ field }" name="password">
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        v-bind="field"
                                        autocomplete="off"
                                        placeholder=""
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                </CardContent>
                <CardFooter class="flex flex-col">
                    <Button class="w-full" @click="onSubmit">Fazer login</Button>
                </CardFooter>
            </form>
        </Card>
    </div>
  </main>
</template>