import React from 'react';
import CrudPage from '../../components/Comp_pag_Admin/CRUDpage';
import { PhotoService } from "../../Services/PhotoService";
import type { Photo } from "../../models/Photo";

const PhotoPage: React.FC = () => {
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
      onView={async (item) => {
        const photo = await PhotoService.getById(item.id);
        if (!photo) alert("Foto no encontrada");
        else console.log("Foto vista:", photo);
      }}
      onEdit={async (item) => {
        const dataToUpdate = {
          issue_id: item.issue_id,
          image_url: item.image_url,
          caption: item.caption,
          taken_at: item.taken_at,
        };
        const updated = await PhotoService.update(item.id, dataToUpdate);
        if (!updated) alert("Error al actualizar la foto.");
        else console.log("Foto actualizada:", updated);
      }}
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
