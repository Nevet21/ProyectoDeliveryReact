import React from 'react';
import CrudPage from '../../components/Comp_pag_Admin/CRUDpage';
import { OrderService } from "../../Services/OrderService";
import type { Order } from "../../models/Order";
import { useNavigate } from "react-router-dom";

const OrderPage: React.FC = () => {
  const navigate = useNavigate();

  const columns = [
    { key: 'customer_id', label: 'Cliente' },
    { key: 'menu_id', label: 'Menú' },
    { key: 'motorcycle_id', label: 'Motocicleta' },
    { key: 'quantity', label: 'Cantidad' },
    { key: 'total_price', label: 'Precio Total' },
    { key: 'status', label: 'Estado' }
  ];

  return (
    <CrudPage<Order>
      title="Pedidos"
      columns={columns}
      fetchAll={OrderService.getAll}
      onCreate={async (newData) => {
        await OrderService.create(newData);
      }}
      onView={(item) => navigate(`/orders/${item.id}`)}
      onEdit={(item) => navigate(`/orders/${item.id}/edit`)}
      onDelete={async (item) => {
        const success = await OrderService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar el pedido.");
        }
      }}
    />
  );
};

export default OrderPage;


