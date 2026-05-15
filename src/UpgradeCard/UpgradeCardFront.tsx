import type { UpgradeCardData, TriggerActionType } from "../types";
import { GiPistolGun, GiClawSlashes, GiSparkles } from "react-icons/gi";

const ACTION_ICONS: Partial<Record<TriggerActionType, React.ReactElement>> = {
  "🔫": <GiPistolGun style={{ verticalAlign: "middle", margin: "0 3px" }} />,
  "✨": <GiSparkles style={{ verticalAlign: "middle", margin: "0 3px" }} />,
  "🗡️": <GiClawSlashes style={{ verticalAlign: "middle", margin: "0 3px" }} />,
};
import { getFaction } from "../factions";
import {
  AbilityRow,
  ActionSection,
  TriggerRow,
} from "../SharedComponents/DisplayComponents";
import "./UpgradeCard.css";

function triggerPreamble(
  actionType: TriggerActionType,
  statCard: boolean,
  count: number,
): React.ReactNode {
  const noun = count === 1 ? "trigger" : "triggers";
  let spec: React.ReactNode;
  switch (actionType) {
    case "attack":
      spec = "all its attack actions";
      break;
    case "all":
      spec = statCard ? "all actions printed on its stat card" : "all actions";
      break;
    default:
      spec = <>its {ACTION_ICONS[actionType]} actions</>;
  }
  return (
    <>
      This model gains the following {noun} on {spec}:
    </>
  );
}

export default function UpgradeCardFront({ card }: { card: UpgradeCardData }) {
  const faction = getFaction(card.faction);

  const hasAbilities = card.abilities.length > 0;
  const hasTriggers = card.triggers.length > 0;
  const hasActions = card.actions.length > 0;
  const abilityNoun = card.abilities.length === 1 ? "ability" : "abilities";
  const actionNoun = card.actions.length === 1 ? "action" : "actions";

  return (
    <div className="upgrade-card">
      <div className="uc-header" style={{ backgroundColor: faction.color }}>
        <div className="uc-header-band">
          <span className="uc-type">{card.upgradeType || "M"}</span>
        </div>
      </div>

      <div className="uc-content">
        <h1 className="uc-name" style={{ color: faction.color }}>
          {card.name || "UPGRADE NAME"}
        </h1>
        <div className="uc-ornament" style={{ color: faction.color }}>
          ~ ❦ ~
        </div>

        <div className="uc-body">
          {card.upgradeEffect && (
            <p className="uc-effect">{card.upgradeEffect}</p>
          )}

          {hasAbilities && (
            <div className="uc-block">
              <p className="uc-preamble">
                This model gains the following {abilityNoun}:
              </p>
              {card.abilities.map((a) => (
                <AbilityRow key={a.id} ability={a} />
              ))}
            </div>
          )}

          {hasTriggers && (
            <div className="uc-block">
              <p className="uc-preamble">
                {triggerPreamble(
                  card.triggerActionType,
                  card.triggerPrintedOnStatCard,
                  card.triggers.length,
                )}
              </p>
              {card.triggers.map((t) => (
                <TriggerRow key={t.id} trigger={t} />
              ))}
            </div>
          )}

          {hasActions && (
            <div className="uc-block">
              <p className="uc-preamble">
                This model gains the following {actionNoun}:
              </p>
              <ActionSection actions={card.actions} color={faction.color} />
            </div>
          )}
        </div>

        <div className="uc-limitations">
          <p className="uc-lim-heading" style={{ color: faction.color }}>
            LIMITATIONS
          </p>
          <hr className="uc-lim-hr" style={{ borderColor: faction.color }} />
          <p className="uc-lim-value">{card.limitation || "-"}</p>
        </div>
      </div>

      <div className="uc-footer" style={{ backgroundColor: faction.color }}>
        <div className="uc-footer-band">
          <span className="uc-footer-label">Upgrade</span>
        </div>
      </div>
    </div>
  );
}
