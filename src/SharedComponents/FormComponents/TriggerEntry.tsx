import type { Trigger, Suit } from "../../types";

export const SUITS: Suit[] = ["🐏", "🦅", "📖", "🎭", "💎"];

export function TriggerEntry({
  trigger,
  onChange,
  onRemove,
}: {
  trigger: Trigger;
  onChange: (patch: Partial<Trigger>) => void;
  onRemove?: () => void;
}) {
  return (
    <div className="trigger-entry">
      <div className="row gap-sm">
        <select
          value={trigger.suit}
          onChange={(e) => onChange({ suit: e.target.value as Suit })}
        >
          {SUITS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          value={trigger.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Trigger name"
        />
        {onRemove && (
          <button type="button" onClick={onRemove}>
            ×
          </button>
        )}
      </div>
      <input
        value={trigger.requirement}
        onChange={(e) => onChange({ requirement: e.target.value })}
        placeholder="Requirement (italic, optional)"
      />
      <textarea
        value={trigger.effect}
        onChange={(e) => onChange({ effect: e.target.value })}
        rows={2}
        placeholder="Effect"
      />
    </div>
  );
}
