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
import { toast } from '@/components/ui/toast/use-toast'

import { ref } from "vue";
import { RegisterUserSchema } from "@/schemas/UserSchema.js"
import { toTypedSchema } from '@vee-validate/zod'

import { useForm } from 'vee-validate';

const formSchema = toTypedSchema(RegisterUserSchema);
const login = ref(false);

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: formSchema,
});

const handleLoginRegister = () => {
    login.value = !login.value;
}

const onSubmit = handleSubmit(async (formValues) => {
  try {
    console.log(formValues);

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
                    <div class="hidden">
                        <FormField v-slot="{ field }" name="id">
                            <FormItem>
                                <FormLabel>ID</FormLabel>
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
                    <div v-if="!login">
                        <FormField v-slot="{ field }" name="name">
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
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
                    <div>
                        <FormField v-slot="{ field }" name="confirmPassword" v-if="!login">
                            <FormItem>
                                <FormLabel>Confirmar senha</FormLabel>
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
                    <Button class="w-full" v-if="!login" @click="onSubmit">Cadastrar</Button>
                    <Button class="w-full" v-else>Fazer login</Button>
                    <small v-if="!login">
                        Já está cadastrado? Faça o login <span class="text-primary underline font-bold cursor-pointer" @click="handleLoginRegister">aqui</span>
                    </small>
                    <small v-else>
                        Não tem cadastro? Faça o cadastro <span class="text-primary underline font-bold cursor-pointer" @click="handleLoginRegister">aqui</span>
                    </small>
                </CardFooter>
            </form>
        </Card>
    </div>
  </main>
</template>