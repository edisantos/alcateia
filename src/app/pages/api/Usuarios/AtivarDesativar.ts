import { API_ATIVAR_USUARIO } from "@/constants/endpoint";
import api from "@/services/axios/config";

const AtivarDesativar = async (email: string) => {
   
    try {
        const response = await api.put(API_ATIVAR_USUARIO,
            { email },
            
        );
        console.log("Usuário ativado com sucesso:", response.data);
        return true; // Retorna verdadeiro para sucesso
    } catch (error) {
        console.error("Erro ao ativar usuário:", error);
        return false; // Retorna falso para falha
    }


};

export default AtivarDesativar;