import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { DriverService } from "../../Services/DriverService";
import type { Driver } from "../../models/Driver";
import { useNavigate } from "react-router-dom";

const DriverPage: React.FC = () => {
  const navigate = useNavigate();

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
      onView={(item) => navigate(`/drivers/${item.id}`)}
      onEdit={(item) => navigate(`/drivers/${item.id}/edit`)}
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
