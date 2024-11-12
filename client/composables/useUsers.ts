
import { reactive, ref } from 'vue';
import { toast } from '@/components/ui/toast/use-toast'
import type { User } from '~/schemas/UserSchema';

const useUsers = () => {
    const config = useRuntimeConfig();
    const users = ref<User[]>([])

    const addUser = (formValues: any) => {
        users.value.push(formValues);
    }


    
    return {
        addUser
    }
}

export default useUsers;