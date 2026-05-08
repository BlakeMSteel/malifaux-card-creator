export function GroupHeader({ index, uniqueOnly, excludePeon, excludeSummonToken, onChange, onRemove }: {
  index: number
  uniqueOnly: boolean
  excludePeon: boolean
  excludeSummonToken: boolean
  onChange: (patch: Partial<{ uniqueOnly: boolean; excludePeon: boolean; excludeSummonToken: boolean }>) => void
  onRemove: () => void
}) {
  return (
    <>
      <div className="row gap-sm">
        <span className="label-text">Group {index + 1}</span>
        <button type="button" onClick={onRemove}>× Remove Group</button>
      </div>
      <label className="inline">
        <input type="checkbox" checked={uniqueOnly}
          onChange={e => onChange({ uniqueOnly: e.target.checked })} />
        Unique models only
      </label>
      <label className="inline">
        <input type="checkbox" checked={excludePeon}
          onChange={e => onChange({ excludePeon: e.target.checked })} />
        Non-Peon only
      </label>
      <label className="inline">
        <input type="checkbox" checked={excludeSummonToken}
          onChange={e => onChange({ excludeSummonToken: e.target.checked })} />
        Exclude Summon token
      </label>
    </>
  )
}
