import { API_BUSCAR_PROFILES } from "@/constants/endpoint"
import api from "@/services/axios/config"
import { GetName } from "@/services/GetName";
//import { GetName } from "@/services/GetName";
import Cookies from "js-cookie";

const BuscarPerfil = async () => {
   
    try {
        const token = Cookies.get("authToken") || null;
        const email = GetName(token);
        
        if (!token) {
            console.error("Token não encontrado");
            return null;
          }
        //const email = "edinaldolemos@yahoo.com.br" //GetName(token);
        const response = await api.get(API_BUSCAR_PROFILES, { params: { email } });
        if (response && response.data) {
            console.log(response);
            return response.data;

        }
        return null;
    } catch (error) {
        console.error("Houve um erro ao tentar buscar o perfil", error)
    }
}
export default BuscarPerfil;