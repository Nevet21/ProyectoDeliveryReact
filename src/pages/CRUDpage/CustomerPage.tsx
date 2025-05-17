import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { CustomerService } from "../../Services/CusstomerService";
import type { Customer } from "../../models/Customer";
import { useNavigate } from "react-router-dom";

const CustomerPage: React.FC = () => {
  const navigate = useNavigate();

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Correo Electrónico" },
    { key: "phone", label: "Teléfono" },
  ];

  return (
    <CrudPage<Customer>
      title="Clientes"
      columns={columns}
      fetchAll={CustomerService.getAll}
      onCreate={async (newData) => {
        await CustomerService.create(newData);
      }}
      onView={(item) => navigate(`/customers/${item.id}`)}
      onEdit={(item) => navigate(`/customers/${item.id}/edit`)}
      onDelete={async (item) => {
        const success = await CustomerService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar el cliente.");
        }
      }}
    />
  );
};

export default CustomerPage;
