"use client";
import {
  ROUTER_HOME,
  ROUTER_LOGIN,
  ROUTER_PROFILE,
  ROUTER_REGISTER,
} from "@/constants/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ProfilesData } from "@/types/ProfilesData";
import BuscarPerfil from "@/app/pages/api/Profiles/BuscarPerfil";

const Navbar = () => {
  //const { user, logout } = useAuthContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfilesData | null>(null);

  const router = useRouter();

  useEffect(() => {
    const handleAuthChange = () => {
      const token = Cookies.get("authToken");
      const user = Cookies.get("userName");

      if (token && user) {
        setIsLoggedIn(true);
        setUserName(user);
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    };
    const interval = setInterval(() => {
      handleAuthChange();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // if (!isClient) return null;
  const MostrarCombo = () => {
    setIsMenuOpen(true);
  };
  const logout = () => {
    if (confirm("Realmente deseja sair do sistema?")) {
      Cookies.remove("authToken");
      Cookies.remove("userName");
      setIsLoggedIn(false);
      setUserName(null);
      router.push(ROUTER_LOGIN);
    }
  };

  const handleBuscarAvatar = async () => {
    try {
      const data = await BuscarPerfil();
      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      console.error("Houve um erro ao buscar o avatar:", error);
    }
  };
  useEffect(() => {
    if (isLoggedIn && userName) {
      handleBuscarAvatar();
    }
  }, [isLoggedIn, userName]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-white to-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center space-x-4">
          <Link href={ROUTER_HOME}>
            <Image
              src="/assets/Logos/Alcateia-transparente.png" // Substitua pelo caminho da sua logo
              alt="Logo"
              className="w-10 h-10 rounded-full cursor-pointer"
              width={100}
              height={100}
            />
          </Link>
        </div>

        <div>
          <ul className="flex space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href={ROUTER_LOGIN}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  <span>Login</span>
                </Link>
                <Link
                  href={ROUTER_REGISTER}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Criar Conta
                </Link>
              </>
            ) : (
              <div className="relative flex items-center space-x-2">
                <button
                  onMouseEnter={MostrarCombo}
                  onClick={toggleMenu}
                  className="focus:outline-none flex items-center space-x-2"
                >
                  <Image
                    src={
                      profileData?.avatar
                        ? `data:image/png;base64,${profileData?.avatar}`
                        : "/assets/Avatar/Avatar1.png"
                    }
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full cursor-pointer mr-1"
                  />

                  <p className="text-gray-800 font-medium">
                    {isLoggedIn ? userName : ""}
                  </p>
                </button>
                {isMenuOpen && (
                  <div className="absolute top-full mt-4 right-0 w-40 bg-white shadow-lg rounded-lg">
                    <Link
                      href={ROUTER_PROFILE}
                      className="flex items-center space-x-6 py-4 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <FaUser className="text-gray-900 w-5 h-5 ml-4" />
                      <span className="text-gray-900">Perfil</span>
                    </Link>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                      className="flex items-center space-x-6 py-4 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <FaSignOutAlt className="text-gray-900 w-5 h-5 ml-4" />
                      <span className="text-gray-900">Sair</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
