import { API_DELETAR_USUARIO } from "@/constants/endpoint";
import api from "@/services/axios/config";

const DeleteUser = async(email:string)=>{
    try{
      const response = await api.put(API_DELETAR_USUARIO,
        {email}
    );
    console.log(response.data);
    return true;
    }catch(error){
        console.error("Erro ao ativar usuário:", error);
        return false; // Retorna falso para falha
    }
}

export default DeleteUser;