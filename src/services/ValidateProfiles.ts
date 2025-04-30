"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";


type Props = {
    allowedRoles: string[]; // Lista de roles permitidas
    redirectPath?: string; // Caminho para redirecionar caso o acesso seja negado
  }

function extractRoles(token:string):string[]{
    try {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const decodedToken: { [key: string]: any } = jwtDecode(token);
        return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || [];
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return [];
      }
}

export function ValidateProfiles({allowedRoles, redirectPath ="/"}:Props){
    const router = useRouter();

    useEffect(()=>{
        const token = Cookies.get("authToken");
        if(token){
            const roles = extractRoles(token);
            const hasAccess = roles.some((role) => allowedRoles.includes(role));
            if(!hasAccess){
                console.warn("Acesso negado: role não permitida");
                router.push(redirectPath); // Redireciona caso não tenha permissão
            }
        }else{
            console.warn("Acesso negado: token não encontrado");
            router.push(redirectPath);
        }
    }, [allowedRoles, redirectPath, router]);
}