import { Fragment, useRef, useState } from "react";
import type {
  CardGroupData,
  SavedCardEntry,
  SavedCrewCardEntry,
  SavedUpgradeCardEntry,
} from "../types";
import CardLayout from "../SharedComponents/CardLayout";
import { exportContainerToPdf } from "../SharedComponents/exportPdf";
import GroupCardForm from "./Form/GroupCardForm";
import StatCardFront from "../StatCard/Front/StatCardFront";
import StatCardBack from "../StatCard/Back/StatCardBack";
import CrewCardFront from "../CrewCard/Front/CrewCardFront";
import CrewCardBack from "../CrewCard/Back/CrewCardBack";
import UpgradeCardFront from "../UpgradeCard/UpgradeCardFront";

interface Props {
  group: CardGroupData;
  onChange: (group: CardGroupData) => void;
  statCards: SavedCardEntry[];
  crewCards: SavedCrewCardEntry[];
  upgradeCards: SavedUpgradeCardEntry[];
  onExport: () => void;
  onImport: () => void;
}

export default function GroupCard({
  group,
  onChange,
  statCards,
  crewCards,
  upgradeCards,
  onExport,
  onImport,
}: Props) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [pdfExporting, setPdfExporting] = useState(false);

  const crewEntry = crewCards.find((e) => e.id === group.crewCardId);
  const statEntries = group.statCardIds
    .map((id) => statCards.find((e) => e.id === id))
    .filter((e): e is SavedCardEntry => !!e);
  const upgradeEntries = group.upgradeCardIds
    .map((id) => upgradeCards.find((e) => e.id === id))
    .filter((e): e is SavedUpgradeCardEntry => !!e);

  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setPdfExporting(true);
    try {
      await exportContainerToPdf(
        previewRef.current,
        `${group.name || "group"}.pdf`,
      );
    } catch {
      window.alert("Could not generate the PDF.");
    } finally {
      setPdfExporting(false);
    }
  };

  return (
    <CardLayout
      form={
        <GroupCardForm
          group={group}
          onChange={onChange}
          statCards={statCards}
          crewCards={crewCards}
          upgradeCards={upgradeCards}
          onExport={onExport}
          onImport={onImport}
          onExportPdf={handleExportPdf}
          pdfExporting={pdfExporting}
        />
      }
      preview={
        <div className="cards-container" ref={previewRef}>
          {crewEntry && (
            <Fragment key={crewEntry.id}>
              <CrewCardFront card={crewEntry.card} />
              <CrewCardBack card={crewEntry.card} />
            </Fragment>
          )}
          {statEntries.map((e) => (
            <Fragment key={e.id}>
              <StatCardFront card={e.card} />
              <StatCardBack card={e.card} />
            </Fragment>
          ))}
          {upgradeEntries.map((e) => (
            <UpgradeCardFront key={e.id} card={e.card} />
          ))}
        </div>
      }
    />
  );
}
