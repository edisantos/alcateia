import { API_LOGIN } from "@/constants/endpoint";
import api from "@/services/axios/config";
import { SiginData } from "@/types/SignInData";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const LoginAuth = async (data: SiginData) => {
    try {
        const response = await api.post(API_LOGIN, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("Analisar",response.data)
        return response.data;
  
    } catch (error) {
        if (axios.isAxiosError(error)) {
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            const axiosError = error as AxiosError<{ message: string; errors?: any }>;
            console.error("Erro de validação na API:", axiosError.response?.data?.message);
                toast.error(axiosError.response?.data?.message);
                if (axiosError.response?.data?.errors) {
                console.error("Detalhes do erro:", axiosError.response.data.errors);
            }
        } else {
            console.error("Erro inesperado:", error);
        }
        throw new Error("Erro ao fazer login. Verifique os dados e tente novamente.");
    }

}
export default LoginAuth;