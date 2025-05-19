import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { DriverService } from "../../Services/DriverService";
import type { Driver } from "../../models/Driver";

const DriverPage: React.FC = () => {
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "license_number", label: "Número de Licencia" },
    { key: "phone", label: "Teléfono" },
    { key: "email", label: "Correo Electrónico" },
    { key: "status", label: "Estado" },
  ];

  return (
    <CrudPage<Driver>
      title="Conductores"
      columns={columns}
      fetchAll={DriverService.getAll}
      onCreate={async (newData) => {
        await DriverService.create(newData);
      }}
      onView={async (item) => {
        const driver = await DriverService.getById(item.id);
        if (!driver) alert("Conductor no encontrado");
        else console.log("Conductor visto:", driver);
      }}
      onEdit={async (item) => {
        const dataToUpdate = {
          name: item.name,
          license_number: item.license_number,
          phone: item.phone,
          email: item.email,
          status: item.status,
        };
        const updated = await DriverService.update(item.id, dataToUpdate);
        if (!updated) alert("Error al actualizar el conductor.");
        else console.log("Conductor actualizado:", updated);
      }}
      onDelete={async (item) => {
        const success = await DriverService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar el conductor.");
        }
      }}
    />
  );
};

export default DriverPage;
