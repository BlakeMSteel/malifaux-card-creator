import { useState } from "react";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./CardLayout.css";

interface Props {
  form: React.ReactNode;
  preview: React.ReactNode;
}

export default function CardLayout({ form, preview }: Props) {
  const [formOpen, setFormOpen] = useState(true);

  return (
    <div className={`card-layout${formOpen ? "" : " collapsed"}`}>
      <div className="cl-form-panel">{form}</div>
      <IconButton
        size="small"
        onClick={() => setFormOpen((o) => !o)}
        aria-label="Toggle form"
        sx={{
          width: 24,
          flexShrink: 0,
          borderRadius: 0,
          bgcolor: "grey.200",
          "&:hover": { bgcolor: "grey.300" },
          height: "100%",
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        {formOpen ? (
          <ChevronLeftIcon fontSize="small" />
        ) : (
          <ChevronRightIcon fontSize="small" />
        )}
      </IconButton>
      <div className="cl-preview-panel">{preview}</div>
    </div>
  );
}
