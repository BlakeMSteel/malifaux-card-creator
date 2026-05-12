import type { Ability } from "../../types";

export function AbilityEntry({
  ability,
  index,
  onChange,
  onRemove,
}: {
  ability: Ability;
  index: number;
  onChange: (patch: Partial<Ability>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="ability-entry">
      <div className="row gap-sm">
        <span className="label-text">{index + 1}.</span>
        <input
          value={ability.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Name"
        />
        <button type="button" onClick={onRemove}>
          ×
        </button>
      </div>
      <div className="row gap-sm">
        <label className="inline">
          <input
            type="checkbox"
            checked={ability.defensiveSymbol !== ""}
            onChange={(e) =>
              onChange({ defensiveSymbol: e.target.checked ? "🛡️" : "" })
            }
          />
          Defensive?
        </label>
        {ability.defensiveSymbol !== "" && (
          <select
            value={ability.defensiveSymbol}
            onChange={(e) => onChange({ defensiveSymbol: e.target.value })}
          >
            <option value="🛡️">🛡️</option>
            <option value="🔮">🔮</option>
            <option value="🪬">🪬</option>
          </select>
        )}
      </div>
      <input
        value={ability.requirement}
        onChange={(e) => onChange({ requirement: e.target.value })}
        placeholder="Requirement, e.g. Once per activation. (optional)"
      />
      <textarea
        value={ability.text}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Ability text"
        rows={2}
      />
    </div>
  );
}
