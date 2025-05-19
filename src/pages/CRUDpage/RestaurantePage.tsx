import React from 'react';
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { RestaurantService } from "../../Services/RestauranteService";
import type { Restaurante } from "../../models/Restaurante";

const RestaurantPage: React.FC = () => {
  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'address', label: 'Dirección' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'email', label: 'Correo Electrónico' }
  ];

  return (
    <CrudPage<Restaurante>
      title="Restaurantes"
      columns={columns}
      fetchAll={RestaurantService.getAll}
      onCreate={async (newData) => {
        await RestaurantService.create(newData);
      }}
      onView={async (item) => {
        const restaurante = await RestaurantService.getById(item.id);
        if (!restaurante) {
          alert("Restaurante no encontrado.");
        } else {
          console.log("Restaurante:", restaurante);
        }
      }}
      onEdit={async (item) => {
        const dataToUpdate = {
          name: item.name,
          address: item.address,
          phone: item.phone,
          email: item.email,
        };
        const updated = await RestaurantService.update(item.id, dataToUpdate);
        if (!updated) {
          alert("Error al actualizar el restaurante.");
        } else {
          console.log("Restaurante actualizado:", updated);
        }
      }}
      onDelete={async (item) => {
        const success = await RestaurantService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar el restaurante.");
        }
      }}
    />
  );
};

export default RestaurantPage;

