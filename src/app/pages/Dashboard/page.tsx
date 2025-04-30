
import DashboardLayout from "@/app/layouts/index";
import UsuariosCharts from "@/components/UsuariosCharts";


export default function DashboardPage() {
  return (
    <DashboardLayout>
     
      <div className="flex w-full justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 mx-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Usuários
          </h2>
          <UsuariosCharts />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 mx-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Financeiro
          </h2>
          <UsuariosCharts />
        </div>
      </div>
    </DashboardLayout>
  );
}