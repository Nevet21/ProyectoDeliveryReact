import React from 'react';
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { ShiftService } from "../../Services/ShiftService";
import type { Shift } from "../../models/Shift";

const ShiftPage: React.FC = () => {
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
        if (newData.start_time && typeof newData.start_time !== 'string') {
          newData.start_time = new Date(newData.start_time).toISOString();
        }
        if (newData.end_time && typeof newData.end_time !== 'string') {
          newData.end_time = new Date(newData.end_time).toISOString();
        }
        await ShiftService.create(newData);
      }}
      onView={async (item) => {
        const shift = await ShiftService.getById(item.id);
        if (!shift) {
          alert("Turno no encontrado.");
        } else {
          console.log("Turno:", shift);
        }
      }}
      onEdit={async (item) => {
        const dataToUpdate = {
          driver_id: item.driver_id,
          motorcycle_id: item.motorcycle_id,
          start_time: typeof item.start_time === 'string' ? item.start_time : new Date(item.start_time).toISOString(),
          end_time: typeof item.end_time === 'string' ? item.end_time : new Date(item.end_time).toISOString(),
          status: item.status,
        };
        const updated = await ShiftService.update(item.id, dataToUpdate);
        if (!updated) {
          alert("Error al actualizar el turno.");
        } else {
          console.log("Turno actualizado:", updated);
        }
      }}
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
