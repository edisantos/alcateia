"use client";
import { ROUTER_DASHBOARD} from "@/constants/router";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginAuth from "../api/Authentication/LoginAuth";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import { LockClosedIcon, UserIcon } from "@heroicons/react/16/solid";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ userName: "", password: "" });

  const router = useRouter();

  useEffect(() => {
   
    const authToken = Cookies.get("authToken");
    if (authToken) {
      router.replace(ROUTER_DASHBOARD)
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
   
    // Envolve o processo de login na Promise que resolve ou rejeita de acordo com o resultado
    await toast.promise(
      (async () => {
        try {
          const result = await LoginAuth(formData);
         
          if (result && result.token) {
            Cookies.set("authToken", result.token);
            Cookies.set("userName", result.name);
            
           
            // Aguarda o tempo de 2 segundos para simular o redirecionamento antes de mudar a rota
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            router.push(ROUTER_DASHBOARD);

            // Caso a autenticação seja bem-sucedida, resolve a Promise
            return "Login realizado com sucesso! Redirecionando...";
          } else {
            // Caso o login falhe, lança um erro para que a Promise seja rejeitada
            throw new Error("Usuário ou senha inválidos.");
          }
           /* eslint-disable  @typescript-eslint/no-explicit-any */
        } catch (error:any) {
          console.error("Erro ao tentar fazer login:", error);
          
          if (error) {
            const errorMessage =
            error.response?.data?.message ||
            "Ocorreu um erro inesperado. Tente novamente mais tarde.";
            console.error("Erro ao tentar fazer login:", errorMessage);
            throw new Error(errorMessage);
            
          }
        }
      })(),
      {
        pending: "Aguarde login em processamento...",
        success: "Login realizado com sucesso! Redirecionando...",
        error: {
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          render({ data }: any) {
           
            return data?.message || "Erro ao fazer login.";
          },
        },
      }
    );
 
  };

  return (
    <div className="w-full h-auto">
    <hr />
    <div className="flex justify-center items-center py-5">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">
           <div className="flex justify-center">
           <Image
          src="/assets/Logos/Alcateia-transparente.png"
          alt="Logo"
          width={80}
          height={80}
        />
          
          </div>
         
        </h2>
        <hr className="py-3" />
        <div className="mb-4 relative">
          <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-900" />
          <input
            type="text"
            id="userName"
            name="userName"
            className="mt-1 block w-full pl-10 p-2 border border-gray-900 rounded-md focus:ring focus:ring-indigo-200"
            placeholder="Entre com seu primeiro nome"
            required
            onChange={handleChange}
            value={formData.userName}
          />
        </div>
        <div className="mb-4 relative">
          <LockClosedIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            placeholder="Entre com uma senha"
            required
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
         Login
        </button>
        <p className="text-sm text-center text-gray-500">
          Não tem uma conta?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </form>
     
    </div>
   <Footer/>
  </div>
  );
};
export default LoginForm;
