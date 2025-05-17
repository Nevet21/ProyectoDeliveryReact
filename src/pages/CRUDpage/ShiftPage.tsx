import React from 'react';
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { ShiftService } from "../../Services/ShiftService";
import type { Shift } from "../../models/Shift";
import { useNavigate } from "react-router-dom";

const ShiftPage: React.FC = () => {
  const navigate = useNavigate();

  const columns = [
    { key: 'driver_id', label: 'Conductor' },
    { key: 'motorcycle_id', label: 'Motocicleta' },
    { key: 'start_time', label: 'Hora Inicio' },
    { key: 'end_time', label: 'Hora Fin' },
    { key: 'status', label: 'Estado' }
  ];

  return (
    <CrudPage<Shift>
      title="Turnos"
      columns={columns}
      fetchAll={ShiftService.getAll}
      onCreate={async (newData) => {
        // Aquí puedes convertir fechas a ISO si es necesario
        if (newData.start_time && typeof newData.start_time !== 'string') {
          newData.start_time = new Date(newData.start_time).toISOString();
        }
        if (newData.end_time && typeof newData.end_time !== 'string') {
          newData.end_time = new Date(newData.end_time).toISOString();
        }
        await ShiftService.create(newData);
      }}
      onView={(item) => navigate(`/shifts/${item.id}`)}
      onEdit={(item) => navigate(`/shifts/${item.id}/edit`)}
      onDelete={async (item) => {
        const success = await ShiftService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar el turno.");
        }
      }}
    />
  );
};

export default ShiftPage;
