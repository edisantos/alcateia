"use client";

import { ROUTER_LOGIN } from "@/constants/router";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
type Props ={
  title?:string;
}
const LogOut = ({title ="Sair do Sistema"}:Props) => {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Realmente deseja sair do sistema?")) {
      Cookies.remove("authToken");
      Cookies.remove("userName");

      router.push(ROUTER_LOGIN);
    }
  };

  return (
    <button
      className="text-white rounded-full bg-blue-700 px-6 py-2"
      onClick={handleLogout}
    >
      {title}
    </button>
  );
};

export default LogOut;