import type { Action, Trigger } from "../../types";
import { FaBoltLightning } from "react-icons/fa6";
import {
  GiRamProfile,
  GiFeatheredWing,
  GiOpenBook,
  GiDualityMask,
  GiFloatingCrystal,
} from "react-icons/gi";
import type { Suit } from "../../types";

const SUIT_ICONS: Record<Suit, React.ReactElement> = {
  "🐏": <GiRamProfile />,
  "🦅": <GiFeatheredWing />,
  "📖": <GiOpenBook />,
  "🎭": <GiDualityMask />,
  "💎": <GiFloatingCrystal />,
};
import "./ActionBlock.css";

export function TriggerRow({ trigger }: { trigger: Trigger }) {
  return (
    <div className="act-trigger">
      <span className="act-suit">{SUIT_ICONS[trigger.suit as Suit]}</span>
      <span>
        <strong>
          <em>{trigger.name}:</em>
        </strong>
        {trigger.requirement && <em> {trigger.requirement}</em>}
        {trigger.effect && ` ${trigger.effect}`}
      </span>
    </div>
  );
}

export function ActionBlock({ action }: { action: Action }) {
  const rg = action.rg === "-" ? "-" : `${action.rg}"`;
  return (
    <div className="act-action">
      <div className="act-stat-row">
        <span>
          {action.signature && (
            <span className="act-sig">
              <FaBoltLightning />{" "}
            </span>
          )}
          <strong>{action.name}</strong>
        </span>
        <span>{rg}</span>
        <span>{action.skl}</span>
        <span>{action.rst}</span>
        <span>{action.tn}</span>
        <span>{action.dmg}</span>
      </div>
      <div className="act-text">
        {action.requirement && <em> {action.requirement} </em>}
        {action.effect && ` ${action.effect}`}
      </div>
      {action.triggers.map((t) => (
        <TriggerRow key={t.id} trigger={t} />
      ))}
    </div>
  );
}
