import React from 'react';
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { RestaurantService } from "../../Services/RestauranteService";
import type { Restaurante } from "../../models/Restaurante";
import { useNavigate } from "react-router-dom";

const RestaurantPage: React.FC = () => {
  const navigate = useNavigate();

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
      onView={(item) => navigate(`/restaurants/${item.id}`)}
      onEdit={(item) => navigate(`/restaurants/${item.id}/edit`)}
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
