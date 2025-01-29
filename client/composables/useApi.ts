export function useApi() {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBaseUrl || "http://localhost:3030";

    const api = async (path: string, {options, optionsHeader}: any) => {
        try {
            const headers = {
                ...optionsHeader,
                'Content-Type': 'application/json'
            }
            const res = await $fetch(`${config.public.apiBaseUrl}/api/${path}`, {
                ...options,
                headers
            })

            console.log(res);

            return res;
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return {api};
}