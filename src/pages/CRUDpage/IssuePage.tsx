import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { IssueService } from "../../Services/IssueService";
import type { Issue } from "../../models/Issue";

const IssuePage: React.FC = () => {
  const columns = [
    { key: "motorcycle_id", label: "ID Motocicleta" },
    { key: "description", label: "Descripción" },
    { key: "issue_type", label: "Tipo de Problema" },
    { key: "date_reported", label: "Fecha Reportada" },
    { key: "status", label: "Estado" },
  ];

  return (
    <CrudPage<Issue>
      title="Incidencias"
      columns={columns}
      fetchAll={IssueService.getAll}
      onCreate={async (newData) => {
        await IssueService.create(newData);
      }}
      onView={async (item) => {
        const issue = await IssueService.getById(item.id);
        if (!issue) alert("Incidencia no encontrada");
        else console.log("Incidencia vista:", issue);
      }}
      onEdit={async (item) => {
        const dataToUpdate = {
          motorcycle_id: item.motorcycle_id,
          description: item.description,
          issue_type: item.issue_type,
          date_reported: item.date_reported,
          status: item.status,
        };
        const updated = await IssueService.update(item.id, dataToUpdate);
        if (!updated) alert("Error al actualizar la incidencia.");
        else console.log("Incidencia actualizada:", updated);
      }}
      onDelete={async (item) => {
        const success = await IssueService.remove(item.id);
        if (!success) {
          alert("Hubo un error al eliminar la incidencia.");
        }
      }}
    />
  );
};

export default IssuePage;
