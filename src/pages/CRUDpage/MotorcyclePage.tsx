import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { MotorcycleService } from "../../Services/MotorcycleService";
import type { Motorcycle } from "../../models/Motorcycle";
import { useNavigate } from "react-router-dom";

const MotorcyclePage: React.FC = () => {
  const navigate = useNavigate();

  const columns = [
    { key: "license_plate", label: "Placa" },
    { key: "brand", label: "Marca" },
    { key: "year", label: "Año" },
    { key: "status", label: "Estado" }
  ];

  return (
    <CrudPage<Motorcycle>
      title="Motocicletas"
      columns={columns}
      fetchAll={MotorcycleService.getAll}
      onCreate={async (newData) => {
        await MotorcycleService.create(newData);
      }}
      onView={(item) => navigate(`/motorcycles/${item.id}`)}
      onEdit={(item) => navigate(`/motorcycles/${item.id}/edit`)}
      onDelete={async (item) => {
        const success = await MotorcycleService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar la motocicleta.");
        }
      }}
    />
  );
};

export default MotorcyclePage;
