import type { Action, ActionType, Trigger, RstValue } from '../../types'
import { TriggerEntry } from './TriggerEntry'

export const RST_VALUES: RstValue[] = ['Df', 'Wp', 'Sp', 'Sz', 'X', '*', '-']

export function ActionEntry({ action, onChange, onRemove }: {
  action: Action
  onChange: (patch: Partial<Action>) => void
  onRemove: () => void
}) {
  const addTrigger = () => {
    const t: Trigger = { id: crypto.randomUUID(), suit: '🐏', name: '', requirement: '', effect: '' }
    onChange({ triggers: [...action.triggers, t] })
  }
  const updateTrigger = (id: string, patch: Partial<Trigger>) =>
    onChange({ triggers: action.triggers.map(t => t.id === id ? { ...t, ...patch } : t) })
  const removeTrigger = (id: string) =>
    onChange({ triggers: action.triggers.filter(t => t.id !== id) })

  return (
    <div className="action-entry">
      <div className="row gap-sm">
        <select value={action.type} onChange={e => onChange({ type: e.target.value as ActionType })}>
          <option value="Attack">Attack</option>
          <option value="Tactical">Tactical</option>
        </select>
        <label className="inline">
          <input type="checkbox" checked={action.signature}
            onChange={e => onChange({ signature: e.target.checked })} />
          ⚡ Signature?
        </label>
        <button type="button" onClick={onRemove}>× Remove</button>
      </div>
      <label>Name
        <input value={action.name} onChange={e => onChange({ name: e.target.value })} />
      </label>
      <div className="row gap-sm wrap">
        <label>Rg <input className="input-narrow" value={action.rg} onChange={e => onChange({ rg: e.target.value })} /></label>
        <label>Skl <input className="input-narrow" value={action.skl} onChange={e => onChange({ skl: e.target.value })} /></label>
        <label>Rst
          <select value={action.rst} onChange={e => onChange({ rst: e.target.value as RstValue })}>
            {RST_VALUES.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label>TN <input className="input-narrow" value={action.tn} onChange={e => onChange({ tn: e.target.value })} /></label>
        <label>Dmg <input className="input-narrow" value={action.dmg} onChange={e => onChange({ dmg: e.target.value })} /></label>
      </div>
      <label>Requirement
        <input value={action.requirement} onChange={e => onChange({ requirement: e.target.value })} placeholder="Italic text (optional)" />
      </label>
      <label>Effect
        <textarea value={action.effect} onChange={e => onChange({ effect: e.target.value })} rows={2} placeholder="Effect text" />
      </label>
      <div className="subsection">
        <p className="label-text">Triggers</p>
        {action.triggers.map(t => (
          <TriggerEntry key={t.id} trigger={t}
            onChange={patch => updateTrigger(t.id, patch)}
            onRemove={() => removeTrigger(t.id)}
          />
        ))}
        <button type="button" onClick={addTrigger}>+ Add Trigger</button>
      </div>
    </div>
  )
}
