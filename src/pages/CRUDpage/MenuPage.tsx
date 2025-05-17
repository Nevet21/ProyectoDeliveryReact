import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { MenuService } from "../../Services/MenuService";
import type { Menu } from "../../models/Menu";
import { useNavigate } from "react-router-dom";

const MenuPage: React.FC = () => {
  const navigate = useNavigate();

  const columns = [
    { key: "restaurant_id", label: "ID Restaurante" },
    { key: "product_id", label: "ID Producto" },
    { key: "price", label: "Precio" },
    { key: "availability", label: "Disponible" },
  ];

  return (
    <CrudPage<Menu>
      title="Menús"
      columns={columns}
      fetchAll={MenuService.getAll}
      onCreate={async (newData) => {
        await MenuService.create(newData);
      }}
      onView={(item) => navigate(`/menus/${item.id}`)}
      onEdit={(item) => navigate(`/menus/${item.id}/edit`)}
      onDelete={async (item) => {
        const success = await MenuService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar el menú.");
        }
      }}
    />
  );
};

export default MenuPage;

