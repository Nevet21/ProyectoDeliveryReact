import React from 'react';
import CrudPage from '../../components/Comp_pag_Admin/CRUDpage';
import { PhotoService } from "../../Services/PhotoService";
import type { Photo } from "../../models/Photo";
import { useNavigate } from "react-router-dom";

const PhotoPage: React.FC = () => {
  const navigate = useNavigate();

  const columns = [
    { key: 'issue_id', label: 'Issue ID' },
    { key: 'image_url', label: 'URL Imagen' },
    { key: 'caption', label: 'Descripción' },
    { key: 'taken_at', label: 'Fecha de la Foto' }
  ];

  return (
    <CrudPage<Photo>
      title="Fotos"
      columns={columns}
      fetchAll={PhotoService.getAll}
      onCreate={async (newData) => {
        await PhotoService.create(newData);
      }}
      onView={(item) => navigate(`/photos/${item.id}`)}
      onEdit={(item) => navigate(`/photos/${item.id}/edit`)}
      onDelete={async (item) => {
        const success = await PhotoService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar la foto.");
        }
      }}
    />
  );
};

export default PhotoPage;
