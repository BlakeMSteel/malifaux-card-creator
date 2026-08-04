import type { CardData } from "../../types";
import { getFaction } from "../../factions";
import { ActionSection } from "../../SharedComponents/DisplayComponents";
import { useShrinkScale } from "../../SharedComponents/useShrinkScale";
import "./StatCardBack.css";

export default function StatCardBack({ card }: { card: CardData }) {
  const faction = getFaction(card.faction);
  const bodyRef = useShrinkScale<HTMLDivElement>([card.actions], {
    minScale: 0.7,
  });

  return (
    <div className="card card-back">
      <div className="cb-top">
        <strong>{card.name || "Model Name"}</strong>
      </div>
      <div className="cb-body" ref={bodyRef}>
        <ActionSection actions={card.actions} color={faction.color} />
      </div>
      <div className="cb-bottom">{card.baseSize}</div>
    </div>
  );
}
