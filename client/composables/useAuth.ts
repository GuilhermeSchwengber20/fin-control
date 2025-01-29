// DESENVOLVER LOGICA DO TOKEN
import type { UserLogin } from "~/schemas/UserSchema"

import { toast } from '@/components/ui/toast/use-toast'

export function useAuth () {
    const { api } = useApi();
    const login = async (payload: UserLogin) => {
        try {
            const parsedData = JSON.stringify(payload);
            const res: any = await api("auth", {
                options: {
                    method: "POST",
                    body: parsedData
                }
            })
            console.log(res);
            if(res.error) {
                toast({
                    title: 'Erro ao logar',
                    description: res.error,
                });
            }

            navigateTo("/app/dashboard");
        } catch (error: any) {
            console.error(error.message);            
        }
    }

    return {
        login
    }
}