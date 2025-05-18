import React from 'react';
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { ProductService } from "../../Services/ProductService";
import type { Product } from "../../models/Product";

const ProductPage: React.FC = () => {
  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripción' },
    { key: 'price', label: 'Precio' },
    { key: 'category', label: 'Categoría' }
  ];

  return (
    <CrudPage<Product>
      title="Productos"
      columns={columns}
      fetchAll={ProductService.getAll}
      onCreate={async (newData) => {
        await ProductService.create(newData);
      }}
      onView={async (item) => {
        const product = await ProductService.getById(item.id);
        if (!product) alert("Producto no encontrado.");
        else console.log("Producto:", product);
      }}
      onEdit={async (item) => {
        const dataToUpdate = {
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
        };
        const updated = await ProductService.update(item.id, dataToUpdate);
        if (!updated) alert("Error al actualizar el producto.");
        else console.log("Producto actualizado:", updated);
      }}
      onDelete={async (item) => {
        const success = await ProductService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar el producto.");
        }
      }}
    />
  );
};

export default ProductPage;
