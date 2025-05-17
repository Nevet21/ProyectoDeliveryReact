import React from "react";
import CrudPage from "../../components/Comp_pag_Admin/CRUDpage";
import { IssueService } from "../../Services/IssueService";
import type { Issue } from "../../models/Issue";
import { useNavigate } from "react-router-dom";

const IssuePage: React.FC = () => {
  const navigate = useNavigate();

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
      onView={(item) => navigate(`/issues/${item.id}`)}
      onEdit={(item) => navigate(`/issues/${item.id}/edit`)}
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
