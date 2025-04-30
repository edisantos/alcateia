import { TipoServicoType } from "./TipoServicoType";


export interface UsuariosType{
    id:string;
    dataCadastro:string;
    primeiroNome:string;
    ultimoNome:string;
    tipoContaId:number;
    tipoConta: TipoServicoType
    userName:string;
    email:string;
    emailConfirmed:boolean
}