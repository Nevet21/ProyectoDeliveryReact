import { useEffect, useState } from "react";

type Column<T> = {
  key: keyof T;
  label: string;
};

type CrudPageProps<T> = {
  title: string;
  columns: Column<T>[];
  fetchAll: () => Promise<T[]>;
  onCreate: () => void;
  onView: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => Promise<void>;
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                <button
          onClick={onCreate}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow cursor-pointer"
        >
          Crear
        </button>

      </div>

      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4 space-y-1">
                {columns.map((col) => (
                  <div key={col.key as string}>
                    <span className="font-semibold text-gray-700">
                      {col.label}:
                    </span>{" "}
                    <span className="text-gray-800">{String(item[col.key])}</span>
                  </div>
                ))}
              </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onView(item)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
              >
                Ver
              </button>
              <button
                onClick={() => onEdit(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
              >
                Borrar
              </button>
            </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
