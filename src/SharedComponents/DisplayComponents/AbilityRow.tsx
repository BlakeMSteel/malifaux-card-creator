import type { Ability } from "../../types";
import "./AbilityRow.css";
import { GoShieldLock, GoShieldX, GoShield } from "react-icons/go";

const DEFENSIVE_ICONS: Record<string, React.ReactElement> = {
  "🛡️": <GoShieldLock />,
  "🔮": <GoShieldX />,
  "🪬": <GoShield />,
};

export function AbilityRow({ ability }: { ability: Ability }) {
  return (
    <p className="ability-row">
      {ability.defensiveSymbol && (
        <>{DEFENSIVE_ICONS[ability.defensiveSymbol]}</>
      )}
      <strong>{ability.name}:</strong>
      {ability.requirement && <em> {ability.requirement}</em>} {ability.text}
    </p>
  );
}
