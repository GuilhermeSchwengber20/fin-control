// DESENVOLVER LOGICA DO TOKEN
import type { UserLogin } from "~/schemas/UserSchema"



export function useAuth () {
    const config = useRuntimeConfig();

    // verificar melhor como usar o useFetch
    const login = async (payload: UserLogin) => {
        try {
           const response: any = await $fetch(`${config.public.apiBaseUrl}/api/auth`, {
                method: "POST",
                body: {...payload},
           });

           if(response.refresh_token && response.token) {
                setTokens(response)
           }

        } catch (error: any) {
            throw new Error("Credenciais inválidas")   
        }
    }

    const setTokens = ({token, refresh_token}: any) => {
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
    }

    const getTokens = () => {
        const token = localStorage.getItem("token");
        const refresh_token = localStorage.getItem("refresh_token");

        return {
            token,
            refresh_token
        }
    }

    return {
        login,
        getTokens,
        setTokens
    }
}