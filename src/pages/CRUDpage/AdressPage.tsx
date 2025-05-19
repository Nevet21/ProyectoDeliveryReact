import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { AddressService } from "../../Services/AdressService";
import type { Address } from "../../models/Adress";

const AddressPage: React.FC = () => {
  const columns = [
    { key: "order_id", label: "ID Pedido" },
    { key: "street", label: "Calle" },
    { key: "city", label: "Ciudad" },
    { key: "state", label: "Estado" },
    { key: "postal_code", label: "Código Postal" },
    { key: "additional_info", label: "Información Adicional" },
  ];

  return (
    <CrudPage<Address>
      title="Direcciones"
      columns={columns}
      fetchAll={AddressService.getAll}
      onCreate={async (newData) => {
        await AddressService.create(newData);
      }}
      onView={async (item) => {
        const address = await AddressService.getById(item.id);
        if (!address) alert("Dirección no encontrada");
        else console.log("Dirección vista:", address);
      }}
      onEdit={async (item) => {
        // Envía todos los campos para evitar error 400
        const dataToUpdate = {
          order_id: item.order_id,
          street: item.street,
          city: item.city,
          state: item.state,
          postal_code: item.postal_code,
          additional_info: item.additional_info,
        };
        const updated = await AddressService.update(item.id, dataToUpdate);
        if (!updated) alert("Error al actualizar la dirección.");
        else console.log("Dirección actualizada:", updated);
      }}
      onDelete={async (item) => {
        const success = await AddressService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar la dirección.");
        }
      }}
    />
  );
};

export default AddressPage;
