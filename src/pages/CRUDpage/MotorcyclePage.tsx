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
      
      onEdit={async (item) => {
  // Enviar todos los campos actuales o los que quieres actualizar
  const dataToUpdate = {
    license_plate: item.license_plate,
    brand: item.brand,
    year: item.year,
    status: item.status, // o el nuevo valor que quieras poner
  };

  const updated = await MotorcycleService.update(item.id, dataToUpdate);
  if (!updated) alert("Error al actualizar la motocicleta.");
  else console.log("Motocicleta actualizada:", updated);
}}

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
