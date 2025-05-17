import { useEffect, useState } from "react";
import { DynamicFormModal } from "./DynamicFormModal"; // Ajusta la ruta según tu proyecto

type Column<T> = {
  key: keyof T;
  label: string;
};

type CrudPageProps<T> = {
  title: string;
  columns: Column<T>[];
  fetchAll: () => Promise<T[]>;
  onCreate: (newData: Omit<T, "id">) => Promise<void>;
  onView: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => Promise<void>;
};

type Field = {
  key: string;
  label: string;
  type: "text" | "number" | "email";
};

export default function CrudPage<T extends { id: number | string }>({
  title,
  columns,
  fetchAll,
  onCreate,
  onView,
  onEdit,
  onDelete,
}: CrudPageProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<T>>({});

  const loadData = async () => {
    setLoading(true);
    const items = await fetchAll();
    setData(items);
    setLoading(false);
  };

  const handleDelete = async (item: T) => {
    if (confirm("¿Estás seguro de eliminar este registro?")) {
      await onDelete(item);
      await loadData();
    }
  };

  const handleCreate = async (values: T) => {
    await onCreate(values as Omit<T, "id">);
    setShowModal(false);
    setFormData({});
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  // Mapeo para obtener los campos con tipo correcto para DynamicFormModal
const fields: Field[] = columns
  .filter((col) => col.key !== undefined && col.key !== null && col.key !== 'total_price') // 👈 exclusión aquí
  .map((col) => {
    const keyLower = String(col.key).toLowerCase();

    let fieldType: "number" | "text" | "email" = "text";

    if (keyLower.includes("email")) {
      fieldType = "email";
    } else if (
      keyLower.includes("phone") ||
      keyLower.includes("tel") ||
      keyLower.includes("numero") ||
      keyLower.includes("id")
    ) {
      fieldType = "number";
    }

    return {
      key: col.key as string,
      label: col.label,
      type: fieldType,
    };
  });



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow cursor-pointer"
        >
          Crear
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
              <tr>
                {columns.map((col) => (
                  <th key={col.key as string} className="px-6 py-3 font-semibold">
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                >
                  {columns.map((col) => (
                    <td key={col.key as string} className="px-6 py-4 text-gray-800">
                      {String(item[col.key])}
                    </td>
                  ))}
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => onView(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs cursor-pointer"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs cursor-pointer"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DynamicFormModal<T>
        open={showModal}
        title={`Crear ${title.slice(0, -1)}`}
        fields={fields}
        data={formData}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
