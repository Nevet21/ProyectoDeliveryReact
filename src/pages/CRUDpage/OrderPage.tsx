import React from 'react';
import CrudPage from '../../components/Comp_pag_Admin/CRUDpage';
import { OrderService } from "../../Services/OrderService";
import type { Order } from "../../models/Order";

const OrderPage: React.FC = () => {
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
      onView={async (item) => {
        const order = await OrderService.getById(item.id);
        if (!order) alert("Pedido no encontrado");
        else console.log("Pedido visto:", order);
      }}
      onEdit={async (item) => {
        const dataToUpdate = {
          customer_id: item.customer_id,
          menu_id: item.menu_id,
          motorcycle_id: item.motorcycle_id,
          quantity: item.quantity,
          total_price: item.total_price,
          status: item.status,
        };
        const updated = await OrderService.update(item.id, dataToUpdate);
        if (!updated) alert("Error al actualizar el pedido.");
        else console.log("Pedido actualizado:", updated);
      }}
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


