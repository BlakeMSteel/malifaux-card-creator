import type {
  UpgradeCardData, Ability, Trigger, Action, ActionType, TriggerActionType,
} from '../../types'
import { FACTIONS } from '../../factions'
import { AbilityEntry, ActionEntry, TriggerEntry } from '../../SharedComponents/FormComponents'
import '../../SharedComponents/FormComponents/FormStyles.css'
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
    const a: Ability = { id: crypto.randomUUID(), defensiveSymbol: '', name: '', requirement: '', text: '' }
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
          <AbilityEntry key={ab.id} ability={ab} index={i}
            onChange={patch => updateAbility(ab.id, patch)}
            onRemove={() => removeAbility(ab.id)}
          />
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
          {card.triggers.map(t => (
            <TriggerEntry key={t.id} trigger={t}
              onChange={patch => updateTrigger(t.id, patch)}
              onRemove={() => removeTrigger(t.id)}
            />
          ))}
          <button type="button" onClick={addTrigger}>+ Add Trigger</button>
        </div>
      </section>

      <section>
        <h3>Granted Actions</h3>
        {card.actions.map(action => (
          <ActionEntry key={action.id} action={action}
            onChange={patch => updateAction(action.id, patch)}
            onRemove={() => removeAction(action.id)}
          />
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
