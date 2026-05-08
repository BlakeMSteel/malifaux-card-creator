import { useState } from 'react'
import type { CardData, Station, Ability, Action, ActionType, BaseSize } from '../../types'
import { FACTIONS } from '../../factions'
import { AbilityEntry, ActionEntry } from '../../SharedComponents/FormComponents'
import '../../SharedComponents/FormComponents/FormStyles.css'
import './StatCardForm.css'

const PRESET_CHARACTERISTICS = ['Living', 'Construct', 'Beast', 'Undead']
const STATIONS: { value: Station; label: string }[] = [
  { value: 'Master', label: 'Master' },
  { value: 'Henchman', label: 'Henchman' },
  { value: 'Minion', label: 'Minion' },
  { value: 'Peon', label: 'Peon' },
  { value: '', label: '(none)' },
]

interface Props {
  card: CardData
  onChange: (card: CardData) => void
}

export default function StatCardForm({ card, onChange }: Props) {
  const [customCharInput, setCustomCharInput] = useState('')
  const [newAbility, setNewAbility] = useState({ name: '', text: '' })

  const update = (patch: Partial<CardData>) => onChange({ ...card, ...patch })

  const togglePreset = (char: string) => {
    const next = card.characteristics.includes(char)
      ? card.characteristics.filter(c => c !== char)
      : [...card.characteristics, char]
    update({ characteristics: next })
  }

  const addCustomChar = () => {
    const val = customCharInput.trim()
    if (val && !card.characteristics.includes(val)) {
      update({ characteristics: [...card.characteristics, val] })
    }
    setCustomCharInput('')
  }

  const addAbility = () => {
    if (!newAbility.name.trim()) return
    const ability: Ability = { id: crypto.randomUUID(), name: newAbility.name.trim(), text: newAbility.text.trim() }
    update({ abilities: [...card.abilities, ability] })
    setNewAbility({ name: '', text: '' })
  }

  const updateAbility = (id: string, patch: Partial<Ability>) =>
    update({ abilities: card.abilities.map(a => a.id === id ? { ...a, ...patch } : a) })

  const customChars = card.characteristics.filter(c => !PRESET_CHARACTERISTICS.includes(c))
  const showCount = card.station === 'Minion' || card.station === 'Peon'

  const addAction = (type: ActionType) => {
    const action: Action = {
      id: crypto.randomUUID(), type, signature: false, name: '',
      rg: '-', skl: '-', rst: type === 'Attack' ? 'Df' : '-', tn: '-', dmg: '-',
      requirement: '', effect: '', triggers: [],
    }
    update({ actions: [...card.actions, action] })
  }

  const updateAction = (id: string, patch: Partial<Action>) =>
    update({ actions: card.actions.map(a => a.id === id ? { ...a, ...patch } : a) })

  return (
    <form onSubmit={e => e.preventDefault()} className="card-form">

      <section>
        <h3>Basic Info</h3>
        <label>Faction
          <select value={card.faction} onChange={e => update({ faction: e.target.value })}>
            <option value="">(none)</option>
            {FACTIONS.map(f => (
              <option key={f.name} value={f.name}>{f.name}</option>
            ))}
          </select>
        </label>
        <label>Name
          <input value={card.name} onChange={e => update({ name: e.target.value })} />
        </label>
        <label>Cost
          <input value={card.cost} onChange={e => update({ cost: e.target.value })} placeholder='# or "-"' className="input-narrow" />
        </label>
      </section>

      <section>
        <h3>Image</h3>
        <label>URL
          <input value={card.imageUrl} onChange={e => update({ imageUrl: e.target.value })} placeholder="https://..." />
        </label>
      </section>

      <section>
        <h3>Stats</h3>
        <div className="row gap wrap">
          {(['df', 'wp', 'sp', 'sz'] as const).map(stat => (
            <label key={stat}>{stat.toUpperCase()}
              <input type="number" min={0} max={9} value={card[stat]}
                onChange={e => update({ [stat]: e.target.value })} className="input-narrow" />
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3>Station &amp; Characteristics</h3>
        <label>Station
          <select value={card.station} onChange={e => update({ station: e.target.value as Station })}>
            {STATIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>

        {showCount && (
          <label>Count
            <input type="number" min={1} max={9} value={card.stationCount}
              onChange={e => update({ stationCount: e.target.value })} className="input-narrow" />
          </label>
        )}

        {card.station !== 'Master' && (
          <label>
            <input type="checkbox" checked={card.isTotem} onChange={e => update({ isTotem: e.target.checked })} />
            Totem
          </label>
        )}

        <div className="subsection">
          <p className="label-text">Other Characteristics</p>
          <div className="row wrap gap-sm">
            {PRESET_CHARACTERISTICS.map(c => (
              <label key={c} className="inline">
                <input type="checkbox" checked={card.characteristics.includes(c)} onChange={() => togglePreset(c)} />
                {c}
              </label>
            ))}
          </div>
          {customChars.length > 0 && (
            <div className="row wrap gap-sm">
              {customChars.map(c => (
                <span key={c} className="tag">
                  {c}
                  <button type="button" onClick={() => update({ characteristics: card.characteristics.filter(x => x !== c) })}>×</button>
                </span>
              ))}
            </div>
          )}
          <div className="row gap-sm">
            <input value={customCharInput} onChange={e => setCustomCharInput(e.target.value)}
              placeholder="Custom characteristic"
              onKeyDown={e => e.key === 'Enter' && addCustomChar()} />
            <button type="button" onClick={addCustomChar}>Add</button>
          </div>
        </div>

        <label>Keyword
          <input value={card.keyword} onChange={e => update({ keyword: e.target.value })} />
        </label>
      </section>

      <section>
        <h3>Abilities</h3>
        {card.abilities.map((ab, i) => (
          <AbilityEntry key={ab.id} ability={ab} index={i}
            onChange={patch => updateAbility(ab.id, patch)}
            onRemove={() => update({ abilities: card.abilities.filter(a => a.id !== ab.id) })}
          />
        ))}
        <div className="ability-entry">
          <input value={newAbility.name} onChange={e => setNewAbility(p => ({ ...p, name: e.target.value }))} placeholder="New ability name" />
          <textarea value={newAbility.text} onChange={e => setNewAbility(p => ({ ...p, text: e.target.value }))} placeholder="New ability text" rows={2} />
          <button type="button" onClick={addAbility}>Add Ability</button>
        </div>
      </section>

      <section>
        <h3>Health</h3>
        <label>Max Health (1–15)
          <input type="number" min={1} max={15} value={card.health}
            onChange={e => update({ health: Math.min(15, Math.max(1, Number(e.target.value))) })}
            className="input-narrow" />
        </label>
      </section>

      {card.station === 'Master' && (
        <section>
          <h3>Master Info</h3>
          <label>Left text
            <input value={card.masterLeftText} onChange={e => update({ masterLeftText: e.target.value })} />
          </label>
          <label>Right text
            <input value={card.masterRightText} onChange={e => update({ masterRightText: e.target.value })} />
          </label>
        </section>
      )}

      <section>
        <h3>Actions</h3>
        {card.actions.map(action => (
          <ActionEntry key={action.id} action={action}
            onChange={patch => updateAction(action.id, patch)}
            onRemove={() => update({ actions: card.actions.filter(a => a.id !== action.id) })}
          />
        ))}
        <div className="row gap-sm">
          <button type="button" onClick={() => addAction('Attack')}>+ Attack Action</button>
          <button type="button" onClick={() => addAction('Tactical')}>+ Tactical Action</button>
        </div>
      </section>

      <section>
        <h3>Base Size</h3>
        <label>Size
          <select value={card.baseSize} onChange={e => update({ baseSize: e.target.value as BaseSize })}>
            <option value="30mm">30mm</option>
            <option value="40mm">40mm</option>
            <option value="50mm">50mm</option>
          </select>
        </label>
      </section>

    </form>
  )
}
