import React from 'react';
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { ProductService } from "../../Services/ProductService";
import type { Product } from "../../models/Product";
import { useNavigate } from "react-router-dom";

const ProductPage: React.FC = () => {
  const navigate = useNavigate();

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
      onView={(item) => navigate(`/products/${item.id}`)}
      onEdit={(item) => navigate(`/products/${item.id}/edit`)}
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
