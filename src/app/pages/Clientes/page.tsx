"use client";
import DashboardLayout from "@/app/layouts";
import { FiSearch, FiUserPlus, FiUserX } from "react-icons/fi";
//import { useState } from "react";

const Clientes = () => {
  //const [clientes, setClientes] = useState([]);

  const handleCadastro = () => {
    // Lógica para cadastro
    console.log("Cadastrar cliente");
  };

  const handleDelete = () => {
    // Lógica para deletar
    console.log("Deletar cliente");
  };

  return (
    <DashboardLayout pageTitle="Clientes">
      <div className="flex h-screen">
        <div className="flex-1 p-4">
          {/* Menu com botões de Cadastro e Delete */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Lista de clientes</h1>
            <div className="flex items-center space-x-4">
                Status do Cliente:
                <select className="px-4 py-2 border rounded"
                onChange={(e)=>{
                    const status = e.target.value;
                    console.log("Filtro do status", status);
                }}
                >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
                <button
                className="px-2 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 flex items-center space-x-2"
                >
                    <FiSearch />
                 <span>Pesquisar</span>
                </button>
              <button
                className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-2"
                onClick={handleCadastro}
              >
                <FiUserPlus />
                <span>Cadastrar</span>
              </button>
              <button
                className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center space-x-2"
                onClick={handleDelete}
              >
                <FiUserX />
                <span>Excluir</span>
              </button>
            </div>
          </div>

          {/* Área para listar ou gerenciar clientes */}
          <div className="bg-white shadow rounded p-4">
            <p>Conteúdo da página de clientes vai aqui...</p>
            {/* Exemplo: Tabela, lista, etc. */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clientes;
