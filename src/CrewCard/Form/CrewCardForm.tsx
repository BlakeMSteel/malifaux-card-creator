import type {
  CrewCardData, AbilityGroup, ActionGroup,
  Ability, Action, ActionType, Trigger, Suit, RstValue,
} from '../../types'
import { FACTIONS } from '../../factions'

const SUITS: Suit[] = ['🐏', '🪶', '📖', '🎭', '💎']
const RST_VALUES: RstValue[] = ['Df', 'Wp', 'Sp', 'Sz', 'X', '*', '-']

interface Props {
  card: CrewCardData
  onChange: (card: CrewCardData) => void
}

export default function CrewCardForm({ card, onChange }: Props) {
  const update = (patch: Partial<CrewCardData>) => onChange({ ...card, ...patch })

  // — Ability group helpers —
  const updateAbilityGroup = (groupId: string, patch: Partial<AbilityGroup>) =>
    update({ abilityGroups: card.abilityGroups.map(g => g.id === groupId ? { ...g, ...patch } : g) })

  const addAbilityGroup = () => {
    const g: AbilityGroup = { id: crypto.randomUUID(), uniqueOnly: false, excludeSummonToken: false, abilities: [] }
    update({ abilityGroups: [...card.abilityGroups, g] })
  }

  const removeAbilityGroup = (groupId: string) =>
    update({ abilityGroups: card.abilityGroups.filter(g => g.id !== groupId) })

  const addAbility = (groupId: string) => {
    const ab: Ability = { id: crypto.randomUUID(), name: '', text: '' }
    const g = card.abilityGroups.find(g => g.id === groupId)!
    updateAbilityGroup(groupId, { abilities: [...g.abilities, ab] })
  }

  const updateAbility = (groupId: string, abilityId: string, patch: Partial<Ability>) => {
    const g = card.abilityGroups.find(g => g.id === groupId)!
    updateAbilityGroup(groupId, { abilities: g.abilities.map(a => a.id === abilityId ? { ...a, ...patch } : a) })
  }

  const removeAbility = (groupId: string, abilityId: string) => {
    const g = card.abilityGroups.find(g => g.id === groupId)!
    updateAbilityGroup(groupId, { abilities: g.abilities.filter(a => a.id !== abilityId) })
  }

  // — Action group helpers —
  const updateActionGroup = (groupId: string, patch: Partial<ActionGroup>) =>
    update({ actionGroups: card.actionGroups.map(g => g.id === groupId ? { ...g, ...patch } : g) })

  const addActionGroup = () => {
    const g: ActionGroup = { id: crypto.randomUUID(), uniqueOnly: false, excludeSummonToken: false, actions: [] }
    update({ actionGroups: [...card.actionGroups, g] })
  }

  const removeActionGroup = (groupId: string) =>
    update({ actionGroups: card.actionGroups.filter(g => g.id !== groupId) })

  const addAction = (groupId: string, type: ActionType) => {
    const a: Action = {
      id: crypto.randomUUID(), type, signature: false, name: '',
      rg: '-', skl: '-', rst: type === 'Attack' ? 'Df' : '-', tn: '-', dmg: '-',
      requirement: '', effect: '', triggers: [],
    }
    const g = card.actionGroups.find(g => g.id === groupId)!
    updateActionGroup(groupId, { actions: [...g.actions, a] })
  }

  const updateAction = (groupId: string, actionId: string, patch: Partial<Action>) => {
    const g = card.actionGroups.find(g => g.id === groupId)!
    updateActionGroup(groupId, { actions: g.actions.map(a => a.id === actionId ? { ...a, ...patch } : a) })
  }

  const removeAction = (groupId: string, actionId: string) => {
    const g = card.actionGroups.find(g => g.id === groupId)!
    updateActionGroup(groupId, { actions: g.actions.filter(a => a.id !== actionId) })
  }

  const addTrigger = (groupId: string, actionId: string) => {
    const t: Trigger = { id: crypto.randomUUID(), suit: '🐏', name: '', requirement: '', effect: '' }
    const g = card.actionGroups.find(g => g.id === groupId)!
    const a = g.actions.find(a => a.id === actionId)!
    updateAction(groupId, actionId, { triggers: [...a.triggers, t] })
  }

  const updateTrigger = (groupId: string, actionId: string, triggerId: string, patch: Partial<Trigger>) => {
    const g = card.actionGroups.find(g => g.id === groupId)!
    const a = g.actions.find(a => a.id === actionId)!
    updateAction(groupId, actionId, { triggers: a.triggers.map(t => t.id === triggerId ? { ...t, ...patch } : t) })
  }

  const removeTrigger = (groupId: string, actionId: string, triggerId: string) => {
    const g = card.actionGroups.find(g => g.id === groupId)!
    const a = g.actions.find(a => a.id === actionId)!
    updateAction(groupId, actionId, { triggers: a.triggers.filter(t => t.id !== triggerId) })
  }

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
        <label>Name
          <input value={card.name} onChange={e => update({ name: e.target.value })} placeholder="CREW NAME" />
        </label>
        <label>Master
          <input value={card.master} onChange={e => update({ master: e.target.value })} placeholder="Master Name, Title" />
        </label>
        <label>Keyword
          <input value={card.keyword} onChange={e => update({ keyword: e.target.value })} placeholder="e.g. Nightmare" />
        </label>
      </section>

      <section>
        <h3>Image</h3>
        <label>URL
          <input value={card.imageUrl} onChange={e => update({ imageUrl: e.target.value })} placeholder="https://..." />
        </label>
      </section>

      <section>
        <h3>Ability Groups</h3>
        {card.abilityGroups.map((group, gi) => (
          <div key={group.id} className="action-entry">
            <div className="row gap-sm">
              <span className="label-text">Group {gi + 1}</span>
              <button type="button" onClick={() => removeAbilityGroup(group.id)}>× Remove Group</button>
            </div>
            <label className="inline">
              <input type="checkbox" checked={group.uniqueOnly}
                onChange={e => updateAbilityGroup(group.id, { uniqueOnly: e.target.checked })} />
              Unique models only
            </label>
            <label className="inline">
              <input type="checkbox" checked={group.excludeSummonToken}
                onChange={e => updateAbilityGroup(group.id, { excludeSummonToken: e.target.checked })} />
              Exclude Summon token
            </label>
            <div className="subsection">
              {group.abilities.map((ab, i) => (
                <div key={ab.id} className="ability-entry">
                  <div className="row gap-sm">
                    <span className="label-text">{i + 1}.</span>
                    <input value={ab.name} onChange={e => updateAbility(group.id, ab.id, { name: e.target.value })} placeholder="Name" />
                    <button type="button" onClick={() => removeAbility(group.id, ab.id)}>×</button>
                  </div>
                  <textarea value={ab.text} onChange={e => updateAbility(group.id, ab.id, { text: e.target.value })} placeholder="Ability text" rows={2} />
                </div>
              ))}
              <button type="button" onClick={() => addAbility(group.id)}>+ Add Ability</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addAbilityGroup}>+ Add Ability Group</button>
      </section>

      <section>
        <h3>Action Groups</h3>
        {card.actionGroups.map((group, gi) => (
          <div key={group.id} className="action-entry">
            <div className="row gap-sm">
              <span className="label-text">Group {gi + 1}</span>
              <button type="button" onClick={() => removeActionGroup(group.id)}>× Remove Group</button>
            </div>
            <label className="inline">
              <input type="checkbox" checked={group.uniqueOnly}
                onChange={e => updateActionGroup(group.id, { uniqueOnly: e.target.checked })} />
              Unique models only
            </label>
            <label className="inline">
              <input type="checkbox" checked={group.excludeSummonToken}
                onChange={e => updateActionGroup(group.id, { excludeSummonToken: e.target.checked })} />
              Exclude Summon token
            </label>
            <div className="subsection">
              {group.actions.map(action => (
                <div key={action.id} className="action-entry">
                  <div className="row gap-sm">
                    <select value={action.type} onChange={e => updateAction(group.id, action.id, { type: e.target.value as ActionType })}>
                      <option value="Attack">Attack</option>
                      <option value="Tactical">Tactical</option>
                    </select>
                    <label className="inline">
                      <input type="checkbox" checked={action.signature}
                        onChange={e => updateAction(group.id, action.id, { signature: e.target.checked })} />
                      ⚡ Signature?
                    </label>
                    <button type="button" onClick={() => removeAction(group.id, action.id)}>× Remove</button>
                  </div>
                  <label>Name
                    <input value={action.name} onChange={e => updateAction(group.id, action.id, { name: e.target.value })} />
                  </label>
                  <div className="row gap-sm wrap">
                    <label>Rg <input className="input-narrow" value={action.rg} onChange={e => updateAction(group.id, action.id, { rg: e.target.value })} /></label>
                    <label>Skl <input className="input-narrow" value={action.skl} onChange={e => updateAction(group.id, action.id, { skl: e.target.value })} /></label>
                    <label>Rst
                      <select value={action.rst} onChange={e => updateAction(group.id, action.id, { rst: e.target.value as RstValue })}>
                        {RST_VALUES.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </label>
                    <label>TN <input className="input-narrow" value={action.tn} onChange={e => updateAction(group.id, action.id, { tn: e.target.value })} /></label>
                    <label>Dmg <input className="input-narrow" value={action.dmg} onChange={e => updateAction(group.id, action.id, { dmg: e.target.value })} /></label>
                  </div>
                  <label>Requirement
                    <input value={action.requirement} onChange={e => updateAction(group.id, action.id, { requirement: e.target.value })} placeholder="Italic text (optional)" />
                  </label>
                  <label>Effect
                    <textarea value={action.effect} onChange={e => updateAction(group.id, action.id, { effect: e.target.value })} rows={2} placeholder="Effect text" />
                  </label>
                  <div className="subsection">
                    <p className="label-text">Triggers</p>
                    {action.triggers.map(t => (
                      <div key={t.id} className="trigger-entry">
                        <div className="row gap-sm">
                          <select value={t.suit} onChange={e => updateTrigger(group.id, action.id, t.id, { suit: e.target.value as Suit })}>
                            {SUITS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <input value={t.name} onChange={e => updateTrigger(group.id, action.id, t.id, { name: e.target.value })} placeholder="Trigger name" />
                          <button type="button" onClick={() => removeTrigger(group.id, action.id, t.id)}>×</button>
                        </div>
                        <input value={t.requirement} onChange={e => updateTrigger(group.id, action.id, t.id, { requirement: e.target.value })} placeholder="Requirement (italic, optional)" />
                        <textarea value={t.effect} onChange={e => updateTrigger(group.id, action.id, t.id, { effect: e.target.value })} rows={2} placeholder="Effect" />
                      </div>
                    ))}
                    <button type="button" onClick={() => addTrigger(group.id, action.id)}>+ Add Trigger</button>
                  </div>
                </div>
              ))}
              <div className="row gap-sm">
                <button type="button" onClick={() => addAction(group.id, 'Attack')}>+ Attack Action</button>
                <button type="button" onClick={() => addAction(group.id, 'Tactical')}>+ Tactical Action</button>
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={addActionGroup}>+ Add Action Group</button>
      </section>

    </form>
  )
}
