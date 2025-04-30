"use client";
import { useState } from "react";
import RegisterAuth from "../api/Authentication/RegisterAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTER_LOGIN } from "@/constants/router";
import { AtSymbolIcon, LockClosedIcon, UserIcon } from "@heroicons/react/16/solid";
import Footer from "@/components/Footer";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    primeiroNome: "",
    ultimoNome: "",
    email: "",
    senha: "",
    confirmeSenha: "",
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.primeiroNome) newErrors.primeiroNome = "O primeiro nome é obrigatório.";
    if (!formData.ultimoNome) newErrors.ultimoNome = "O último nome é obrigatório.";
    if (!formData.email) newErrors.email = "O e-mail é obrigatório.";
    if (!formData.senha) newErrors.senha = "A senha é obrigatória.";
    if (formData.senha !== formData.confirmeSenha) {
      newErrors.confirmeSenha = "As senhas não coincidem.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const { data: result, status } = await RegisterAuth(formData);
      if (status === 200) {
        toast.success(result.message, {
          position: "top-right",
          autoClose: 5000,
          onClose: () => {
            router.push(ROUTER_LOGIN);
          },
        });
      } else {
        toast.error(result.message, { position: "top-right", autoClose: 5000 });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error instanceof Error ? error.message : "Erro inesperado.";
      toast.error(`Ops, houve um erro: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-auto">
      <div className="flex justify-center items-center py-5">
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-1/3">
          <h2 className="text-2xl font-bold mb-4 text-center">Criar Conta</h2>
          <hr className="py-3" />
          {[
            {
              id: "primeiroNome",
              name: "primeiroNome",
              placeholder: "Primeiro Nome",
              icon: <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />,
            },
            {
              id: "ultimoNome",
              name: "ultimoNome",
              placeholder: "Último Nome",
              icon: <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />,
            },
            {
              id: "email",
              name: "email",
              placeholder: "E-mail",
              type: "email",
              icon: <AtSymbolIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />,
            },
            {
              id: "senha",
              name: "senha",
              placeholder: "Senha",
              type: "password",
              icon: <LockClosedIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />,
            },
            {
              id: "confirmeSenha",
              name: "confirmeSenha",
              placeholder: "Confirme a Senha",
              type: "password",
              icon: <LockClosedIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />,
            },
          ].map(({ id, name, placeholder, type = "text", icon }) => (
            <div key={id} className="mb-4 relative">
              {icon}
              <input
                type={type}
                id={id}
                name={name}
                className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                placeholder={placeholder}
                aria-label={placeholder}
                aria-required="true"
                required
                onChange={handleChange}
              />
              {errors[name] && <p className="text-red-600 text-sm mt-1">{errors[name]}</p>}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Criar Conta"}
          </button>
        </form>
      </div>
      <Footer />
    </div>

  );
};

export default Register;
