import { SignUpData } from "@/types/SingUpData";
import { ResponseApiType } from "@/types/ResponseApiType";
import api from "@/services/axios/config";
import { API_REGISTER } from "@/constants/endpoint";

const RegisterAuth = async (data: SignUpData): Promise<{ data: ResponseApiType; status: number }> => {

    if (data.senha !== data.confirmeSenha) {
        throw new Error("As senhas não coincidem. Por favor, verifique e tente novamente.");
    }

    try {
        const response = await api.post(API_REGISTER, data);
        return { data: response.data, status: response.status }


    } catch (error: unknown) {

        if (error && typeof error === "object" && "response" in error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorResponse = (error as any).response;
            const statusCode = errorResponse.status;
            const errorMessage = errorResponse.data?.message || "Erro desconhecido no servidor.";
            throw new Error(`Erro (Status ${statusCode}): ${errorMessage}`);
        }
        throw new Error("Erro ao realizar o cadastro: " + (error as Error).message);
    }
    

}


export default RegisterAuth;