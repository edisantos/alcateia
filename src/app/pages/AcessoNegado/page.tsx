import LogOut from "@/components/LogOut";
import Image from "next/image";

const AcessoNegado = () => {
  return (
    <div className="flex max-h-screen flex-col justify-center items-center">
      <Image
        src="/assets/Logos/Alcateia-transparente.png"
        alt="Logo"
        width={200}
        height={200}
      />
      <h1 className="text-center text-red-500 text-2xl">Acesso negado!</h1>
      <br />
      <h5 className="text-blue-900 text-2xl">
        O acesso ao recurso ou operação escolhida não está disponível para seu
        perfil de acesso.
      </h5>
      <br />
      <h5>
        Escolha entre:
        <br />
        <ul>
          <li>
           <LogOut title="Sair do sistema e fazer um novo login"/>
          </li>
          <li>
           
            <button className="text-white rounded-full bg-gray-700 px-6 py-2 mt-2">
            Voltar a pagina inicial
            </button>
          </li>
        </ul>
      </h5>
    </div>
  );
};
export default AcessoNegado;
