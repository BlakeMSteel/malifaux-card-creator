import { useState } from "react";
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
      <button
        className="cl-toggle"
        onClick={() => setFormOpen((o) => !o)}
        aria-label="Toggle form"
      >
        {formOpen ? "‹" : "›"}
      </button>
      <div className="cl-preview-panel">{preview}</div>
    </div>
  );
}
