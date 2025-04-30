import { API_BUSCAR_USUARIOS } from "@/constants/endpoint";
import api from "@/services/axios/config";

const BuscarUsuarios = async ()=>{
 try{

    const response = await api.get(API_BUSCAR_USUARIOS);
   console.log("Lista de usuario",response);
    return response.data;
   

 }catch(error){
  console.log(error);
 }
}
export default BuscarUsuarios;