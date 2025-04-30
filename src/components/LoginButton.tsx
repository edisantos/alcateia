"use client";
import { useState } from "react";
import Cookies from "js-cookie";

interface LoginButtonProps {
  onSuccess?: () => void; // Callback para executar após login bem-sucedido
   /* eslint-disable  @typescript-eslint/no-explicit-any */
  onFailure?: (error: any) => void; // Callback para lidar com erros
}

const LoginButton: React.FC<LoginButtonProps> = ({ onSuccess, onFailure }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true); // Ativa o estado de carregamento
    try {
      // Simula uma chamada de API para login
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Substitua pela lógica real de login

      // Exemplo de setar cookies (substitua pelos dados reais)
      Cookies.set("authToken", "fakeToken");
      Cookies.set("userName", "Edinaldo Santos");

      // Callback de sucesso, se fornecido
      if (onSuccess) {
        onSuccess();
      }
      console.log("Login realizado com sucesso");
    } catch (error) {
      // Callback de erro, se fornecido
      if (onFailure) {
        onFailure(error);
      }
      console.error("Erro ao fazer login", error);
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="hover:text-gray-900 font-medium px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
    >
      {isLoading ? "Carregando..." : "Login"}
    </button>
  );
};

export default LoginButton;