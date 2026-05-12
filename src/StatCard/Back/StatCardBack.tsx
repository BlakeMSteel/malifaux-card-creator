import type { CardData } from "../../types";
import { getFaction } from "../../factions";
import { ActionSection } from "../../SharedComponents/DisplayComponents";
import "./StatCardBack.css";

export default function StatCardBack({ card }: { card: CardData }) {
  const faction = getFaction(card.faction);

  return (
    <div className="card card-back">
      <div className="cb-top">
        <strong>{card.name || "Model Name"}</strong>
      </div>
      <div className="cb-body">
        <ActionSection actions={card.actions} color={faction.color} />
      </div>
      <div className="cb-bottom">{card.baseSize}</div>
    </div>
  );
}
