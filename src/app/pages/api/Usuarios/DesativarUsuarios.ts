import { API_DESATIVAR_USUARIO } from "@/constants/endpoint";
import api from "@/services/axios/config";

const DesativarUsuarios = async (email: string)=>{
    try {
        const response = await api.put(API_DESATIVAR_USUARIO,
            { email },
            
        );
        console.log("Usuário desativado com sucesso:", response.data);
        return true; // Retorna verdadeiro para sucesso
    } catch (error) {
        console.error("Erro ao desativar usuário:", error);
        return false; // Retorna falso para falha
    }
}
export default DesativarUsuarios;