"use client";
import Image from "next/image";
import BuscarPerfil from "../api/Profiles/BuscarPerfil";
import { ProfilesData } from "@/types/ProfilesData";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  Slide,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaPen, FaTimes } from "react-icons/fa";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Profiles = () => {
  const [profileData, setProfileData] = useState<ProfilesData | null>(null);
  const [isOpeModal, setIsOpenModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fetchBuscarPerfil = async () => {
    try {
      const data = await BuscarPerfil();
      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      console.error("Houve um erro ao buscar o perfil:", error);
    }
  };
  useEffect(() => {
    fetchBuscarPerfil();
  }, []);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleClosedModal = () => {
    setIsOpenModal(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profileData) {
      setProfileData({ ...profileData, nome: e.target.value });
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full h-screen p-6 ml-2 flex bg-gray-100">
      {/* Perfil do Usuário */}
      <div className="w-96 bg-white p-4 mr-2 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Meu Perfil</h1>
        <hr className="mb-4" />

        {/* Foto do Perfil */}
        <div className="flex justify-center mb-4">
          {profileData?.avatar && (
            <Image
              src={`data:image/png;base64,${profileData?.avatar}`}
              alt="Foto do Perfil"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              width={100}
              height={100}
            />
          )}
        </div>

        {/* Informações do Perfil */}
        {profileData ? (
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">{profileData.nome}</p>
            <p className="text-sm font-semibold mb-2">{profileData.email}</p>
            <p className="text-sm text-gray-600 mb-4">
              Endereço:{" "}
              <strong>
                {profileData.endereco}, N°: {profileData.numero}
              </strong>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Bairro: <strong>{profileData.bairro}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Cidade: <strong>{profileData.cidade}</strong>, UF:{" "}
              <strong>{profileData.estado}</strong>
            </p>

            {/* Roles */}
            <div className="mt-2">
              <hr />
              <h3 className="text-lg font-semibold mb-2">
                Minhas Autorizações
              </h3>

              <ul className="list-none pl-0 text-sm text-gray-700">
                {profileData.roles.map((role, index) => (
                  <li key={index} className="ml-0">
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Carregando perfil...</p>
        )}
      </div>
      {/* Corpo Principal (Tabela e Botões) */}
      <div className="w-screen bg-white p-4 shadow-lg rounded-lg mr-6">
        <h1 className="text-2xl font-bold mb-4">Gerenciamento</h1>
        <hr />
        <div className="mt-4 mb-4">
          {profileData ? (
           <button className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center" disabled>
           <AddIcon/>
         </button>

          ):(
            <Tooltip title="Cadastrar" placement="right-start" arrow>
            <IconButton sx={{ backgroundColor: "success.main", color: "white", "&:hover": { backgroundColor: "success.dark" } }}>
            <AddIcon/>
            </IconButton>
            </Tooltip>
          )}
          
         
        </div>

        <table className="w-full text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Nome</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {profileData ? (
              <tr key={profileData.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {profileData.nome}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {profileData.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Tooltip title="Excluir" arrow>
                  <IconButton color="error">
                    <DeleteOutlineIcon/>
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="Alterar" arrow>
                    <IconButton onClick={handleOpenModal} color="warning">
                    <EditIcon/>
                    </IconButton>
                  </Tooltip>
                  
                </td>
              </tr>
            ) : (
              <tr>
                 <td colSpan={3} className="text-center p-4">
                 Nenhum dados encontrado
                 </td>
              </tr>
            
            )}
          </tbody>
        </table>
      </div>
      {profileData && (
        <Dialog
          open={isOpeModal}
          onClose={handleClosedModal}
          fullScreen
          TransitionComponent={Transition}
        >
          <Box
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-6 rounded shadow-lg"
            style={{ width: 800 }}
          >
            <Typography variant="h6" component="h2" textAlign="center">
              Atualização de Perfil
            </Typography>
            <Divider />
            <FormControl fullWidth sx={{ m: 1 }}>
              <Box
                className="w-24 h-24 rounded-full cursor-pointer overflow-hidden border-2 border-gray-300"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Foto do Perfil"
                    className="object-cover w-full h-full"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src={`data:image/png;base64,${profileData?.avatar}`}
                    alt="Foto do Perfil"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    width={100}
                    height={100}
                  />
                )}
              </Box>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                value={profileData.nome}
                fullWidth
                onChange={handleInputChange}
                variant="outlined"
                label="Nome"
                className="mt-2"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                value={profileData.email}
                fullWidth
                onChange={handleInputChange}
                variant="outlined"
                label="E-mail"
                className="mt-2"
              />
            </FormControl>
            <Box display="flex" gap={1} className="mt-2">
              <Box flex={1}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    value={profileData.endereco}
                    fullWidth
                    onChange={handleInputChange}
                    variant="outlined"
                    label="Endereço"
                    className="mt-2"
                  />
                </FormControl>
              </Box>
              <Box flex={1}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    value={profileData.numero}
                    fullWidth
                    onChange={handleInputChange}
                    variant="outlined"
                    label="Número"
                    className="mt-2"
                  />
                </FormControl>
              </Box>
            </Box>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                value={profileData.bairro}
                fullWidth
                onChange={handleInputChange}
                variant="outlined"
                label="Bairro"
                className="mt-2"
              />
            </FormControl>
            <Box display="flex" gap={1} className="mt-2">
              <Box flex={1}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    value={profileData.cidade}
                    fullWidth
                    onChange={handleInputChange}
                    variant="outlined"
                    label="Cidade"
                    className="mt-2"
                  />
                </FormControl>
              </Box>
              <Box flex={1}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    value={profileData.estado}
                    fullWidth
                    onChange={handleInputChange}
                    variant="outlined"
                    label="UF"
                    className="mt-2"
                  />
                </FormControl>
              </Box>
            </Box>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                onClick={handleClosedModal}
                variant="outlined"
                startIcon={<FaTimes />}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleOpenModal}
                variant="contained"
                startIcon={<FaPen />}
                color="primary"
              >
                Confirmar
              </Button>
            </div>
          </Box>
        </Dialog>
      )}
    </div>
  );
};

export default Profiles;
