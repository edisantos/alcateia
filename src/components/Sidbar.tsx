"use client";

import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaMoneyBillWave, FaUserCog, FaUsers, FaUserShield } from "react-icons/fa";
import { ROUTER_ADMIN, ROUTER_CLIENTES, ROUTER_FINANCEIRO, ROUTER_REGISTER } from "@/constants/router";

function extractRoles(token: string): string[] {
  try {
     /* eslint-disable  @typescript-eslint/no-explicit-any */
    const decodedToken: { [key: string]: any } = jwtDecode(token);
    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || [];
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return [];
  }
}

export default function SidebarMenu() {
  const router = useRouter();
 

  useEffect(() => {
    const token = Cookies.get("authToken");
  if (token) {
    const roles = extractRoles(token);
    const isAdminOrManager = roles.some((role) => ["Admin", "Manager"].includes(role));

    setMenus((prevMenus) => {
      const adminMenu = prevMenus.find((menu) => menu.name === "Admin");
      if (isAdminOrManager && !adminMenu) {
        return [...prevMenus, { name: "Admin", path: ROUTER_ADMIN, Icon: <FaUserShield /> }];
      } else {
        return prevMenus;
      }
    });
  }
  }, []);
  const [menus, setMenus] = useState([
    { name: "Clientes", path: ROUTER_CLIENTES, Icon: <FaUsers /> },
    { name: "Financeiro", path: ROUTER_FINANCEIRO, Icon: <FaMoneyBillWave /> },
    { name: "Criar Conta", path: ROUTER_REGISTER, Icon: <FaUserCog /> },
  ]);
  return (
    <div className="w-60 h-full bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold border-b border-gray-700 text-center">Menu</div>
      <ul className="mt-4 space-y-2">
        {menus.map((menu, index) => (
          <li
            key={index}
            className={`flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer space-x-2 ${
              !menu.path ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => menu.path && router.push(menu.path)}
          >
            <span className="text-lg">{menu.Icon}</span>
            <span>{menu.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}