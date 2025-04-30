import axios from "axios";
import Cookies from "js-cookie";

if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("A variável de ambiente API_URL não está definida.");
  }

const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   withCredentials:true,
     headers:{
      "Content-Type": "application/json",
     }
  });
  api.interceptors.request.use((config) => {
      const token = Cookies.get("authToken");
     
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        //console.log("Pego pelo axios 2: ",config.headers.Authorization)
        //console.log("Cabeçalhos da requisição configurados:", config.headers);
      }else{
        console.warn("Token não encontrado.");
      }
      return config;
    },
    (error) => {
      console.error("Erro na configuração da requisição:", error);
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response) => response, // Manipulação de respostas bem-sucedidas (se necessário)
    (error) => {
      console.error("Erro na resposta da API:", error.response?.data || error.message);
      return Promise.reject(error);
    }
  );
  export default api;