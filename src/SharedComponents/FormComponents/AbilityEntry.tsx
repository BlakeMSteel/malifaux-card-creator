import type { Ability } from '../../types'

export function AbilityEntry({ ability, index, onChange, onRemove }: {
  ability: Ability
  index: number
  onChange: (patch: Partial<Ability>) => void
  onRemove: () => void
}) {
  return (
    <div className="ability-entry">
      <div className="row gap-sm">
        <span className="label-text">{index + 1}.</span>
        <input value={ability.name} onChange={e => onChange({ name: e.target.value })} placeholder="Name" />
        <button type="button" onClick={onRemove}>×</button>
      </div>
      <textarea value={ability.text} onChange={e => onChange({ text: e.target.value })} placeholder="Ability text" rows={2} />
    </div>
  )
}
