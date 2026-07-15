import type { Ability } from "../../types";
import "./AbilityRow.css";
import { DEFENSIVE_SYMBOLS, renderSymbols } from "../../symbols";

export function AbilityRow({ ability }: { ability: Ability }) {
  return (
    <p className="ability-row">
      {ability.defensiveSymbol && (
        <>{DEFENSIVE_SYMBOLS[ability.defensiveSymbol].icon}</>
      )}
      <strong>{ability.name}:</strong>
      {ability.requirement && (
        <em> {renderSymbols(ability.requirement)}</em>
      )}{" "}
      {renderSymbols(ability.text)}
    </p>
  );
}
