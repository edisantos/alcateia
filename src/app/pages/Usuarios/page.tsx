"use client";
import AdminLayout from "@/app/layouts/AdminLayout";
import BuscarUsuarios from "../api/Usuarios/BuscarUsuarios";
import { useEffect, useState } from "react";
import { UsuariosType } from "@/types/UsuariosType";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  FaCheck,
  FaPlus,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { Modal, Box, Button, Typography } from "@mui/material";
import AtivarDesativar from "../api/Usuarios/AtivarDesativar";
import DesativarUsuarios from "../api/Usuarios/DesativarUsuarios";
import DeleteUser from "../api/Usuarios/DeleteUser";
import { ROUTER_REGISTER } from "@/constants/router";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuariosType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFiltro, setStatusFiltro] = useState<string>("0");
  const [emailFiltro, setEmailFiltro] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDesativar, setIsModalOpenDesativar] = useState(false);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
   const router = useRouter();

  const fechUsuarios = async (status: string, email: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await BuscarUsuarios();
      setIsLoading(false);
      if (response) {
        let listaFiltrada = response;
        if (status !== "0") {
          const isAtivo = status === "1";
          listaFiltrada = listaFiltrada.filter(
            (usuario: UsuariosType) => usuario.emailConfirmed === isAtivo
          );
        }

        if (email) {
          listaFiltrada = listaFiltrada.filter((usuario: UsuariosType) =>
            usuario.email.toLowerCase().includes(email.toLowerCase())
          );
        }

        setUsuarios(listaFiltrada);
      }
    } catch (error) {
      console.error("Error fetching usuarios:", error);
    }
  };
  useEffect(() => {
    fechUsuarios(statusFiltro, emailFiltro);
  }, [statusFiltro, emailFiltro]);

  const handleOpenModal = (email: string) => {
    setSelectedUser(email);
    setIsModalOpen(true);
  };

  const handleOpenModalDesativar = (email: string) => {
    setSelectedUser(email);
    setIsModalOpenDesativar(true);
  };
  const handleOpenModalDeleteUser = (email: string)=>{
    setSelectedUser(email);
    setIsModalOpenDel(true);
  }

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setIsModalOpenDesativar(false);
    setIsModalOpenDel(false);
  };
  const handlePesquisar = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    fechUsuarios(statusFiltro, emailFiltro);
  };

  const handleAtivar = async () => {
    if (selectedUser) {
      const sucesso = await AtivarDesativar(selectedUser);
      if (sucesso) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((user) =>
            user.email === selectedUser
              ? { ...user, emailConfirmed: true }
              : user
          )
        );
      } else {
        alert(`Falha ao ativar o usuário com e-mail ${selectedUser}.`);
      }
    }

    handleCloseModal();
  };

  const handleDesativar = async ()=>{
    if (selectedUser) {
      const sucesso = await DesativarUsuarios(selectedUser);
      if (sucesso) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((user) =>
            user.email === selectedUser
              ? { ...user, emailConfirmed: true }
              : user
          )
        );
      } else {
        alert(`Falha ao ativar o usuário com e-mail ${selectedUser}.`);
      }
    }

    handleCloseModal();
    handlePesquisar();
  }

  const handleDelete = async ()=>{
    if (selectedUser) {
      const sucesso = await DeleteUser(selectedUser);
      if (sucesso) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((user) =>
            user.email === selectedUser
              ? { ...user, emailConfirmed: true }
              : user
          )
        );
      } else {
        alert(`Falha ao ativar o usuário com e-mail ${selectedUser}.`);
      }
    }

    handleCloseModal();
    handlePesquisar();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formaDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <AdminLayout pageTitle="Usuários">
      <div className="flex flex-wrap max-h-screen gap-4 p-4">
        <div className="w-full h-9 flex justify-between items-center mb-4">
          <div className="text-left text-sky-700">
            Total de Registros: {usuarios.length}
          </div>
          <div className="flex space-x-2">
            <select
              className="mt-1 block p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-100"
              onChange={(e) => setStatusFiltro(e.target.value)}
            >
              <option value="0">TODOS</option>
              <option value="1">ATIVO</option>
              <option value="2">INATIVO</option>
            </select>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Pesquisar por e-mail"
              onChange={(e) => setEmailFiltro(e.target.value)}
            />
            <button
              onClick={handlePesquisar}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FaSearch />
              Pesquisar
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={()=> router.push(ROUTER_REGISTER)}
            >
              <FaPlus />
              Cadastrar
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-screen">
            <FaSpinner className="animate-spin text-blue-500" size={50} />
          </div>
        ) : (
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200 rover:bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Data</th>
                <th className="border border-gray-300 px-4 py-2">Nome</th>
                <th className="border border-gray-300 px-4 py-2">Usuário</th>
                <th className="border border-gray-300 px-4 py-2">E-mail</th>
                <th className="border border-gray-300 px-4 py-2">Conta</th>
                <th className="border border-gray-300 px-4 py-2">Staus</th>
                <th
                  colSpan={2}
                  className="border border-gray-300 px-4 py-2 col-span-2"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={usuario.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formaDate(usuario.dataCadastro)}
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2">{new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</td> */}
                  <td className="border border-gray-300 px-4 py-2">
                    {usuario.primeiroNome} {usuario.ultimoNome}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {usuario.userName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {usuario.email}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {usuario.tipoConta.tipo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {usuario.emailConfirmed ? "ATIVO" : "INATIVO"}
                  </td>
                  <td>
                    {usuario.emailConfirmed ? (
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded flex items-center gap-1"
                        title="Desatiar usuário"
                        onClick={() => handleOpenModalDesativar(usuario.email)}
                      >
                        <FaRegThumbsDown size={18} />
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                        title="Ativar Usuário"
                        onClick={() => handleOpenModal(usuario.email)}
                      >
                        <FaRegThumbsUp size={18} />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      title="Excluir"
                      onClick={()=>handleOpenModalDeleteUser(usuario.email)}
                    >
                      <MdDeleteForever size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* {usuarios.map((usuario) => (
            <div key={usuario.id} className="p-4 bg-gray-100 rounded shadow">
                <p><strong>Data do Cadastro:</strong> {usuario.dataCadastro} </p>
              <p><strong>Nome:</strong> {usuario.primeiroNome} {usuario.ultimoNome}</p>
              <p><strong>Usuário:</strong> {usuario.userName}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Tipo de Conta:</strong> {usuario.tipoContaId}</p>
            </div>
          ))} */}
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg"
          style={{ width: 400 }}
        >
          <Typography variant="h6" component="h2">
            Confirmar Ação
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Deseja realmente ativar o usuário com o e-mail{" "}
            <strong>{selectedUser}</strong>?
          </Typography>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCloseModal} variant="outlined" startIcon={<FaTimes  />}>
              Cancelar
            </Button>
            <Button onClick={handleAtivar} variant="contained" color="primary" startIcon={<FaCheck />}>
              Confirmar
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={isModalOpenDesativar} onClose={handleCloseModal}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg"
          style={{ width: 400 }}
        >
          <Typography variant="h6" component="h2">
            Confirmar Ação
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Deseja realmente desativar o usuário com o e-mail{" "}
            <strong>{selectedUser}</strong>?
          </Typography>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCloseModal} variant="outlined" startIcon={<FaTimes  />}>
              Cancelar
            </Button>
            <Button onClick={handleDesativar} variant="contained" startIcon={<FaCheck />} color="warning">
              Confirmar
            </Button>
          </div>
        </Box>
      </Modal>
      {/* Modal delete */}
      <Modal open={isModalOpenDel} onClose={handleCloseModal}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg"
          style={{ width: 400 }}
        >
          <Typography variant="h6" component="h2">
            Confirmar Ação
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Deseja realmente deletar o usuário com o e-mail{" "}
            <strong>{selectedUser}</strong>?
          </Typography>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCloseModal} variant="outlined" startIcon={<FaTimes  />}>
              Cancelar
            </Button>
            <Button onClick={handleDelete} variant="contained" startIcon={<FaTrash />  } color="warning">
              Confirmar
            </Button>
          </div>
        </Box>
      </Modal>
    </AdminLayout>
  );
};
export default Usuarios;
