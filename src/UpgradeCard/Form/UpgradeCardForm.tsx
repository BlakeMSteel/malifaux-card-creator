import type {
  UpgradeCardData, Ability, Trigger, Suit, Action, ActionType, RstValue, TriggerActionType,
} from '../../types'
import { FACTIONS } from '../../factions'
import '../../SharedComponents/FormStyles.css'

const SUITS: Suit[] = ['🐏', '🪶', '📖', '🎭', '💎']
const RST_VALUES: RstValue[] = ['Df', 'Wp', 'Sp', 'Sz', 'X', '*', '-']
const TRIGGER_ACTION_TYPES: { value: TriggerActionType; label: string }[] = [
  { value: 'attack', label: 'all its attack actions' },
  { value: 'all',    label: 'all actions' },
  { value: '🔫',    label: 'its 🔫 actions' },
  { value: '✨',    label: 'its ✨ actions' },
  { value: '🗡️',   label: 'its 🗡️ actions' },
]

interface Props {
  card: UpgradeCardData
  onChange: (card: UpgradeCardData) => void
}

export default function UpgradeCardForm({ card, onChange }: Props) {
  const update = (patch: Partial<UpgradeCardData>) => onChange({ ...card, ...patch })

  // — Ability helpers —
  const addAbility = () => {
    const a: Ability = { id: crypto.randomUUID(), name: '', text: '' }
    update({ abilities: [...card.abilities, a] })
  }
  const updateAbility = (id: string, patch: Partial<Ability>) =>
    update({ abilities: card.abilities.map(a => a.id === id ? { ...a, ...patch } : a) })
  const removeAbility = (id: string) =>
    update({ abilities: card.abilities.filter(a => a.id !== id) })

  // — Trigger helpers —
  const addTrigger = () => {
    const t: Trigger = { id: crypto.randomUUID(), suit: '🐏', name: '', requirement: '', effect: '' }
    update({ triggers: [...card.triggers, t] })
  }
  const updateTrigger = (id: string, patch: Partial<Trigger>) =>
    update({ triggers: card.triggers.map(t => t.id === id ? { ...t, ...patch } : t) })
  const removeTrigger = (id: string) =>
    update({ triggers: card.triggers.filter(t => t.id !== id) })

  // — Action helpers —
  const addAction = (type: ActionType) => {
    const a: Action = { id: crypto.randomUUID(), type, signature: false, name: '', rg: '-', skl: '', rst: 'Df', tn: '-', dmg: '-', requirement: '', effect: '', triggers: [] }
    update({ actions: [...card.actions, a] })
  }
  const updateAction = (id: string, patch: Partial<Action>) =>
    update({ actions: card.actions.map(a => a.id === id ? { ...a, ...patch } : a) })
  const removeAction = (id: string) =>
    update({ actions: card.actions.filter(a => a.id !== id) })

  const addActionTrigger = (actionId: string) => {
    const t: Trigger = { id: crypto.randomUUID(), suit: '🐏', name: '', requirement: '', effect: '' }
    const action = card.actions.find(a => a.id === actionId)!
    updateAction(actionId, { triggers: [...action.triggers, t] })
  }
  const updateActionTrigger = (actionId: string, triggerId: string, patch: Partial<Trigger>) => {
    const action = card.actions.find(a => a.id === actionId)!
    updateAction(actionId, { triggers: action.triggers.map(t => t.id === triggerId ? { ...t, ...patch } : t) })
  }
  const removeActionTrigger = (actionId: string, triggerId: string) => {
    const action = card.actions.find(a => a.id === actionId)!
    updateAction(actionId, { triggers: action.triggers.filter(t => t.id !== triggerId) })
  }

  // — Limitation helpers —
  const isPlentiful = card.limitation.startsWith('Plentiful')
  const plentifulN = card.limitation.match(/\d+/)?.[0] ?? '2'

  return (
    <form onSubmit={e => e.preventDefault()} className="card-form">

      <section>
        <h3>Basic Info</h3>
        <label>Faction
          <select value={card.faction} onChange={e => update({ faction: e.target.value })}>
            <option value="">(none)</option>
            {FACTIONS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
          </select>
        </label>
        <label>Type
          <input value={card.upgradeType} onChange={e => update({ upgradeType: e.target.value })} placeholder="M" />
        </label>
        <label>Name
          <input value={card.name} onChange={e => update({ name: e.target.value })} placeholder="Upgrade Name" />
        </label>
      </section>

      <section>
        <h3>Upgrade Effect</h3>
        <textarea
          value={card.upgradeEffect}
          onChange={e => update({ upgradeEffect: e.target.value })}
          placeholder="Optional free text shown before granted abilities/triggers/actions"
          rows={3}
        />
      </section>

      <section>
        <h3>Granted Abilities</h3>
        {card.abilities.map((ab, i) => (
          <div key={ab.id} className="ability-entry">
            <div className="row gap-sm">
              <span className="label-text">{i + 1}.</span>
              <input value={ab.name} onChange={e => updateAbility(ab.id, { name: e.target.value })} placeholder="Name" />
              <button type="button" onClick={() => removeAbility(ab.id)}>×</button>
            </div>
            <textarea value={ab.text} onChange={e => updateAbility(ab.id, { text: e.target.value })} placeholder="Ability text" rows={2} />
          </div>
        ))}
        <button type="button" onClick={addAbility}>+ Add Ability</button>
      </section>

      <section>
        <h3>Granted Triggers</h3>
        <label>Action type
          <select value={card.triggerActionType} onChange={e => update({ triggerActionType: e.target.value as TriggerActionType })}>
            {TRIGGER_ACTION_TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label className="inline">
          <input type="checkbox" checked={card.triggerPrintedOnStatCard}
            onChange={e => update({ triggerPrintedOnStatCard: e.target.checked })} />
          Printed on their stat card
        </label>
        <div className="subsection">
          {card.triggers.map((t, i) => (
            <div key={t.id} className="trigger-entry">
              <div className="row gap-sm">
                <select value={t.suit} onChange={e => updateTrigger(t.id, { suit: e.target.value as Suit })}>
                  {SUITS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input value={t.name} onChange={e => updateTrigger(t.id, { name: e.target.value })} placeholder={`Trigger ${i + 1} name`} />
                <button type="button" onClick={() => removeTrigger(t.id)}>×</button>
              </div>
              <input value={t.requirement} onChange={e => updateTrigger(t.id, { requirement: e.target.value })} placeholder="Requirement (italic, optional)" />
              <textarea value={t.effect} onChange={e => updateTrigger(t.id, { effect: e.target.value })} rows={2} placeholder="Effect" />
            </div>
          ))}
          <button type="button" onClick={addTrigger}>+ Add Trigger</button>
        </div>
      </section>

      <section>
        <h3>Granted Actions</h3>
        {card.actions.map(action => (
          <div key={action.id} className="action-entry">
            <div className="row gap-sm">
              <select value={action.type} onChange={e => updateAction(action.id, { type: e.target.value as ActionType })}>
                <option value="Attack">Attack</option>
                <option value="Tactical">Tactical</option>
              </select>
              <label className="inline">
                <input type="checkbox" checked={action.signature}
                  onChange={e => updateAction(action.id, { signature: e.target.checked })} />
                ⚡ Signature?
              </label>
              <button type="button" onClick={() => removeAction(action.id)}>× Remove</button>
            </div>
            <label>Name
              <input value={action.name} onChange={e => updateAction(action.id, { name: e.target.value })} />
            </label>
            <div className="row gap-sm wrap">
              <label>Rg <input className="input-narrow" value={action.rg} onChange={e => updateAction(action.id, { rg: e.target.value })} /></label>
              <label>Skl <input className="input-narrow" value={action.skl} onChange={e => updateAction(action.id, { skl: e.target.value })} /></label>
              <label>Rst
                <select value={action.rst} onChange={e => updateAction(action.id, { rst: e.target.value as RstValue })}>
                  {RST_VALUES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </label>
              <label>TN <input className="input-narrow" value={action.tn} onChange={e => updateAction(action.id, { tn: e.target.value })} /></label>
              <label>Dmg <input className="input-narrow" value={action.dmg} onChange={e => updateAction(action.id, { dmg: e.target.value })} /></label>
            </div>
            <label>Requirement
              <input value={action.requirement} onChange={e => updateAction(action.id, { requirement: e.target.value })} placeholder="Italic text (optional)" />
            </label>
            <label>Effect
              <textarea value={action.effect} onChange={e => updateAction(action.id, { effect: e.target.value })} rows={2} placeholder="Effect text" />
            </label>
            <div className="subsection">
              <p className="label-text">Triggers</p>
              {action.triggers.map(t => (
                <div key={t.id} className="trigger-entry">
                  <div className="row gap-sm">
                    <select value={t.suit} onChange={e => updateActionTrigger(action.id, t.id, { suit: e.target.value as Suit })}>
                      {SUITS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <input value={t.name} onChange={e => updateActionTrigger(action.id, t.id, { name: e.target.value })} placeholder="Trigger name" />
                    <button type="button" onClick={() => removeActionTrigger(action.id, t.id)}>×</button>
                  </div>
                  <input value={t.requirement} onChange={e => updateActionTrigger(action.id, t.id, { requirement: e.target.value })} placeholder="Requirement (italic, optional)" />
                  <textarea value={t.effect} onChange={e => updateActionTrigger(action.id, t.id, { effect: e.target.value })} rows={2} placeholder="Effect" />
                </div>
              ))}
              <button type="button" onClick={() => addActionTrigger(action.id)}>+ Add Trigger</button>
            </div>
          </div>
        ))}
        <div className="row gap-sm">
          <button type="button" onClick={() => addAction('Attack')}>+ Attack Action</button>
          <button type="button" onClick={() => addAction('Tactical')}>+ Tactical Action</button>
        </div>
      </section>

      <section>
        <h3>Limitations</h3>
        <label>Type
          <select
            value={isPlentiful ? 'plentiful' : 'unique'}
            onChange={e => update({ limitation: e.target.value === 'plentiful' ? `Plentiful (${plentifulN})` : '-' })}
          >
            <option value="unique">Unique (-)</option>
            <option value="plentiful">Plentiful</option>
          </select>
        </label>
        {isPlentiful && (
          <label>Count
            <input
              type="number"
              min={1}
              value={plentifulN}
              onChange={e => update({ limitation: `Plentiful (${e.target.value})` })}
            />
          </label>
        )}
      </section>

    </form>
  )
}
