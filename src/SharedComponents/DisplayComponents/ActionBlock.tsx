import type { Action, Trigger } from "../../types";
import {
  SUIT_SYMBOLS,
  ACTION_TYPE_SYMBOLS,
  SIGNATURE_SYMBOL,
  renderSymbols,
} from "../../symbols";
import "./ActionBlock.css";

export function TriggerRow({ trigger }: { trigger: Trigger }) {
  return (
    <div className="act-trigger">
      <span className="act-suit">{SUIT_SYMBOLS[trigger.suit].icon}</span>
      <span>
        <strong>
          <em>{trigger.name}:</em>
        </strong>
        {trigger.requirement && <em> {renderSymbols(trigger.requirement)}</em>}
        {trigger.effect && <> {renderSymbols(trigger.effect)}</>}
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
            <span className="act-sig">{SIGNATURE_SYMBOL.icon} </span>
          )}
          <strong>{action.name}</strong>
        </span>
        <span>
          {action.icon && (
            <span className="act-sig">
              {ACTION_TYPE_SYMBOLS[action.icon].icon}{" "}
            </span>
          )}
          {rg}
        </span>
        <span>{action.skl}</span>
        <span>{action.rst}</span>
        <span>{action.tn}</span>
        <span>{action.dmg}</span>
      </div>
      <div className="act-text">
        {action.requirement && <em> {renderSymbols(action.requirement)} </em>}
        {action.effect && <> {renderSymbols(action.effect)}</>}
      </div>
      {action.triggers.map((t) => (
        <TriggerRow key={t.id} trigger={t} />
      ))}
    </div>
  );
}
