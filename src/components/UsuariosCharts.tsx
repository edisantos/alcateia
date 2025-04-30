'use client';

import BuscarUsuarios from '@/app/pages/api/Usuarios/BuscarUsuarios';
import { UsuariosType } from '@/types/UsuariosType';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrando os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UsuariosCharts = () => {
  const [usuarios, setUsuarios] = useState<UsuariosType[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await BuscarUsuarios();
        if (response) {
          setUsuarios(response);
        }
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  const countByStatus = usuarios.reduce(
    (acc, usuario) => {
      if (usuario.emailConfirmed) {
        acc.ativo += 1;
      } else {
        acc.inativo += 1;
      }
      return acc;
    },
    { ativo: 0, inativo: 0 }
  );

  const data = {
    labels: ['Ativo', 'Inativo'], // Legendas para os eixos
    datasets: [
      {
        label: 'Usuários por Status',
        data: [countByStatus.ativo, countByStatus.inativo],
        backgroundColor: ['#FFD700', '#2CB5F8'], // Cores das barras
        borderColor: ['#FFA500', '#007BFF'], // Cores das bordas
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gráfico de Usuários Ativos e Inativos',
      },
    },
  };

  return (
    <div className="w-full h-64 mb-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default UsuariosCharts;
