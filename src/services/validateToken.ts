
import {jwtDecode} from "jwt-decode"; // Instale com: npm i --save-dev @types/jsonwebtoken
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { ROUTER_LOGIN } from "@/constants/router";
const useAuthValidation = () => {
  const router = useRouter();

  useEffect(() => {
    const validateToken = () => {
      const authToken = Cookies.get("authToken");

      if (!authToken) {
        router.replace(ROUTER_LOGIN); // Redireciona se não houver token
        return;
      }

      try {
        // Decodifica o token para verificar a expiração
        const decodedToken: { exp: number } = jwtDecode(authToken);

        // Verifica se o token expirou
        const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
        if (decodedToken.exp < currentTime) {
          console.warn("Token expirado. Redirecionando para login.");
          Cookies.remove("authToken"); // Remove o token inválido
          Cookies.remove("userName");
          router.replace(ROUTER_LOGIN); // Redireciona para login
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        Cookies.remove("authToken");
        Cookies.remove("userName");
        router.replace(ROUTER_LOGIN);
      }
    };

    validateToken();

    // Opcional: Validação periódica do token
    const interval = setInterval(() => {
      validateToken();
    }, 60 * 1000); // Valida a cada 1 minuto

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [router]);
};

export default useAuthValidation;
