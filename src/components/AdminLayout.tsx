import React, { useEffect, useState, Suspense } from 'react';
import axiosInstance from '../../axiosInstance';
import Modal from './Comp_pag_Admin/Modal';

const FormComponents: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
  restaurantes: React.lazy(() => import('../components/Comp_pag_Admin/Restaurante')),
  comidas: React.lazy(() => import('../components/Comp_pag_Admin/Comida')),
  motos: React.lazy(() => import('../components/Comp_pag_Admin/Motorcycle_tot')),
  conductores: React.lazy(() => import('../components/Comp_pag_Admin/Driver_tot')),
  pedidos: React.lazy(() => import('../components/Comp_pag_Admin/Pedido')),
};

type Categoria = keyof typeof FormComponents;
type DataType = Record<string, any>;

const categorias: Record<Categoria, string> = {
  restaurantes: 'Restaurantes',
  comidas: 'Comidas',
  motos: 'Motos',
  conductores: 'Conductores',
  pedidos: 'Pedidos',
};

const endpoints: Record<Categoria, string> = {
  restaurantes: '/restaurants',
  comidas: '/products',
  motos: '/motorcycles',
  conductores: '/drivers',
  pedidos: '/orders',
};

const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Categoria>('restaurantes');
  const [data, setData] = useState<DataType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<DataType | null>(null);
  const [editMode, setEditMode] = useState(false);

  const FormComponent = FormComponents[activeTab];

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(endpoints[activeTab]);
      setData(res.data);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`${endpoints[activeTab]}/${id}`);
      fetchData();
    } catch (e) {
      console.error('Error deleting item:', e);
    }
  };

  const handleEdit = (item: DataType) => {
    setEditMode(true);
    setModalData(item);
    setModalOpen(true);
  };

  const handleAgregar = () => {
    setEditMode(false);
    setModalData(null);
    setModalOpen(true);
  };

  const formatearFecha = (fechaIso: string) => {
  if (!fechaIso) return '—';
  const fecha = new Date(fechaIso);
  return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${fecha.getFullYear()} ${fecha
    .getHours()
    .toString()
    .padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
};



  return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

    <div className="flex gap-4 mb-6">
      {Object.entries(categorias).map(([key, label]) => (
        <button
          key={key}
          onClick={() => {
            setActiveTab(key as Categoria);
            setModalOpen(false);
          }}
          className={`px-4 py-2 rounded ${
            activeTab === key ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>

    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">{categorias[activeTab]}</h2>
        <button
          onClick={handleAgregar}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Agregar {categorias[activeTab].slice(0, -1)}
        </button>
      </div>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key} className="border px-4 py-2 text-left capitalize">
                {key.replace(/_/g, ' ')}
              </th>
            ))}
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id ?? Math.random()} className="hover:bg-gray-50">
              {Object.keys(item).map((key) => (
                <td key={key} className="border px-4 py-2">
                  {key === 'created_at'
                    ? formatearFecha(item[key])
                    : typeof item[key] === 'object' && item[key] !== null
                    ? JSON.stringify(item[key])
                    : item[key]}
                </td>
              ))}
              <td className="border px-4 py-2 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <Suspense fallback={<p>Cargando formulario...</p>}>
        <FormComponent
          data={modalData}
          isEdit={editMode}
          onSuccess={() => {
            fetchData();
            setModalOpen(false);
          }}
        />
      </Suspense>
    </Modal>
  </div>
);

};

export default AdminLayout;
