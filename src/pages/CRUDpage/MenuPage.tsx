import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { MenuService } from "../../Services/MenuService";
import type { Menu } from "../../models/Menu";

const MenuPage: React.FC = () => {
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
      onView={async (item) => {
        const menu = await MenuService.getById(item.id);
        if (!menu) alert("Menú no encontrado");
        else console.log("Menú visto:", menu);
      }}
      onEdit={async (item) => {
        const dataToUpdate = {
          restaurant_id: item.restaurant_id,
          product_id: item.product_id,
          price: item.price,
          availability: item.availability,
        };
        const updated = await MenuService.update(item.id, dataToUpdate);
        if (!updated) alert("Error al actualizar el menú.");
        else console.log("Menú actualizado:", updated);
      }}
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


