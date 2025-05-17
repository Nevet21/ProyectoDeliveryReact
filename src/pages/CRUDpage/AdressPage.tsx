import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { AddressService } from "../../Services/AdressService";
import type { Address } from "../../models/Adress";
import { useNavigate } from "react-router-dom";

const AddressPage: React.FC = () => {
  const navigate = useNavigate();

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
      onView={(item) => navigate(`/addresses/${item.id}`)}
      onEdit={(item) => navigate(`/addresses/${item.id}/edit`)}
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
