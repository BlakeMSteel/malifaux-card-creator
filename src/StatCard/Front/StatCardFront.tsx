import type { CardData } from "../../types";
import { GiFloatingCrystal } from "react-icons/gi";
import { getFaction } from "../../factions";
import { AbilityRow } from "../../SharedComponents/DisplayComponents";
import "./StatCardFront.css";

function buildCharacteristics(card: CardData): string {
  const parts: string[] = [];

  if (card.station === "Minion" || card.station === "Peon") {
    const count = card.stationCount ? ` (${card.stationCount})` : "";
    parts.push(`${card.station}${count}`);
  } else if (card.station) {
    parts.push(card.station);
  }

  if (
    card.station === "Master" ||
    card.station === "Henchman" ||
    card.station === ""
  ) {
    parts.push("Unique");
  }

  if (card.isTotem) parts.push("Totem");

  parts.push(...card.characteristics);

  const chars = parts.join(", ");
  return card.keyword ? `${chars} • ${card.keyword}` : chars;
}

export default function StatCardFront({ card }: { card: CardData }) {
  const isPeon = card.station === "Peon";
  const isMaster = card.station === "Master";
  const faction = getFaction(card.faction);

  return (
    <div className="card" style={{ background: faction.color }}>
      <div className="card-top">
        <div className="faction-circle">{faction.letter}</div>
        <div className="card-name">{card.name || "MODEL NAME"}</div>
        <div className="cost-box">
          <span className="cost-value">{card.cost || "-"}</span>
          <span className="cost-label">COST</span>
        </div>
      </div>

      <div className="card-image-wrapper">
        {card.title && (
          <div className="card-title-badge">{card.title.toUpperCase()}</div>
        )}
        <div className="stat-bubble top-left">
          <span className="stat-value">{card.df}</span>
          <span className="stat-label">DF</span>
        </div>
        <div className="stat-bubble top-right">
          <span className="stat-value">{card.sp}</span>
          <span className="stat-label">SP</span>
        </div>
        <div className="card-image-area">
          {card.imageUrl && (
            <img src={card.imageUrl} alt="" className="card-image" />
          )}
        </div>
        {card.stn && <div className="stn-bubble">STN: {card.stn}</div>}
        <div className="stat-bubble bottom-left">
          <span className="stat-value">{card.wp}</span>
          <span className="stat-label">WP</span>
        </div>
        <div className="stat-bubble bottom-right">
          <span className="stat-value">{card.sz}</span>
          <span className="stat-label">SZ</span>
        </div>
      </div>

      <div className="card-chars">{buildCharacteristics(card)}</div>

      {isMaster && (
        <div className="master-areas">
          <span>{card.masterLeftText}</span>
          <span>{card.masterRightText}</span>
        </div>
      )}

      <div className="card-abilities">
        {card.abilities.map((ab) => (
          <AbilityRow key={ab.id} ability={ab} />
        ))}
      </div>

      <div className="card-health">
        {!isPeon && (
          <div className="health-circle soulstone">
            <GiFloatingCrystal />
          </div>
        )}
        {Array.from({ length: card.health }, (_, i) => (
          <div key={i} className="health-circle">
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
