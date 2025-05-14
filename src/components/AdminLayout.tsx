import React, { useState } from "react";

interface Item {
  id: number;
  nombre: string;
}

type Categoria = "restaurantes" | "comidas" | "motos" | "conductores" | "pedidos";

const categorias: Record<Categoria, string> = {
  restaurantes: "Restaurantes",
  comidas: "Comidas",
  motos: "Motos",
  conductores: "Conductores",
  pedidos: "Pedidos",
};

const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Categoria>("restaurantes");

  const [data, setData] = useState<Record<Categoria, Item[]>>({
    restaurantes: [{ id: 1, nombre: "Pizza Loca" }],
    comidas: [{ id: 1, nombre: "Hamburguesa" }],
    motos: [{ id: 1, nombre: "Yamaha R3" }],
    conductores: [{ id: 1, nombre: "Juan Pérez" }],
    pedidos: [{ id: 1, nombre: "Pedido #1001" }],
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState<string>("");

  const handleDelete = (categoria: Categoria, id: number) => {
    setData((prev) => ({
      ...prev,
      [categoria]: prev[categoria].filter((item) => item.id !== id),
    }));
  };

  const handleEdit = (id: number, nombre: string) => {
    setEditId(id);
    setEditNombre(nombre);
  };

  const handleSave = (categoria: Categoria) => {
    setData((prev) => ({
      ...prev,
      [categoria]: prev[categoria].map((item) =>
        item.id === editId ? { ...item, nombre: editNombre } : item
      ),
    }));
    setEditId(null);
    setEditNombre("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

      {/* Navegación entre categorías */}
      <div className="flex gap-4 mb-6">
        {Object.entries(categorias).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as Categoria)}
            className={`px-4 py-2 rounded ${
              activeTab === key
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Lista de elementos */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{categorias[activeTab]}</h2>
        <ul>
          {data[activeTab].map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 border-b"
            >
              {editId === item.id ? (
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  className="border p-1 rounded flex-1 mr-2"
                />
              ) : (
                <span className="flex-1">{item.nombre}</span>
              )}

              <div className="flex gap-2">
                {editId === item.id ? (
                  <button
                    onClick={() => handleSave(activeTab)}
                    className="text-green-600"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(item.id, item.nombre)}
                    className="text-blue-600"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(activeTab, item.id)}
                  className="text-red-600"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleDelete(activeTab, item.id)}
                  className="text-yellow-600"
                >
                  agregar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminLayout;
