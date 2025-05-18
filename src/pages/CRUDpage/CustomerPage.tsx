import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { CustomerService } from "../../Services/CusstomerService";
import type { Customer } from "../../models/Customer";

const CustomerPage: React.FC = () => {
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
      onView={async (item) => {
        const customer = await CustomerService.getById(item.id);
        if (!customer) alert("Cliente no encontrado");
        else console.log("Cliente visto:", customer);
      }}
      onEdit={async (item) => {
        // Envía todos los campos requeridos por el backend
        const dataToUpdate = {
          name: item.name,
          email: item.email,
          phone: item.phone,
        };
        const updated = await CustomerService.update(item.id, dataToUpdate);
        if (!updated) alert("Error al actualizar el cliente.");
        else console.log("Cliente actualizado:", updated);
      }}
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
