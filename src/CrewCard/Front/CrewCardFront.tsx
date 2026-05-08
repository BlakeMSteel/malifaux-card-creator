import type { CrewCardData, AbilityGroup, ActionGroup, Action, Trigger } from '../../types'
import { getFaction } from '../../factions'
import CrewCardHeader from '../CrewCardHeader'
import './CrewCardFront.css'

const STAT_COLS = ['Rg', 'Skl', 'Rst', 'TN', 'Dmg'] as const

function buildPreamble(keyword: string, uniqueOnly: boolean, excludeSummon: boolean, type: 'ability' | 'action', count: number): string {
  const unique = uniqueOnly ? 'unique ' : ''
  const summon = excludeSummon ? ' without a Summon token' : ''
  const noun = type === 'ability'
    ? (count === 1 ? 'ability' : 'abilities')
    : (count === 1 ? 'action' : 'actions')
  return `Friendly ${unique}${keyword} models${summon} gain the following ${noun}:`
}

function TriggerRow({ trigger }: { trigger: Trigger }) {
  return (
    <div className="cc-trigger">
      <span className="cc-suit">{trigger.suit}</span>
      {' '}<strong><em>{trigger.name}:</em></strong>
      {trigger.requirement && <em> {trigger.requirement}</em>}
      {trigger.effect && ` ${trigger.effect}`}
    </div>
  )
}

function ActionBlock({ action }: { action: Action }) {
  const rg = action.rg === '-' ? '-' : `${action.rg}"`
  return (
    <div className="cc-action">
      <div className="cc-stat-row">
        <span>
          {action.signature && <span className="cc-sig">⚡ </span>}
          <strong>{action.name}</strong>
        </span>
        <span>{rg}</span>
        <span>{action.skl}</span>
        <span>{action.rst}</span>
        <span>{action.tn}</span>
        <span>{action.dmg}</span>
      </div>
      {action.requirement && <p className="cc-italic">{action.requirement}</p>}
      {action.effect && <p className="cc-action-text">{action.effect}</p>}
      {action.triggers.map(t => <TriggerRow key={t.id} trigger={t} />)}
    </div>
  )
}

function SectionBlock({ title, actions, color }: { title: string; actions: Action[]; color: string }) {
  if (actions.length === 0) return null
  return (
    <div className="cc-section">
      <div className="cc-section-header" style={{ color }}>
        <strong>{title}</strong>
        <div className="cc-col-headers">
          {STAT_COLS.map(h => <span key={h}>{h}</span>)}
        </div>
      </div>
      <hr className="cc-hr" />
      {actions.map(a => <ActionBlock key={a.id} action={a} />)}
    </div>
  )
}

function AbilityGroupBlock({ group, keyword }: { group: AbilityGroup; keyword: string; color: string }) {
  if (group.abilities.length === 0) return null
  return (
    <div className="cc-feature-group">
      <p className="cc-preamble">{buildPreamble(keyword, group.uniqueOnly, group.excludeSummonToken, 'ability', group.abilities.length)}</p>
      {group.abilities.map(ab => (
        <p key={ab.id} className="cc-ability">
          <strong>{ab.name}:</strong> {ab.text}
        </p>
      ))}
    </div>
  )
}

function ActionGroupBlock({ group, keyword, color }: { group: ActionGroup; keyword: string; color: string }) {
  if (group.actions.length === 0) return null
  const attacks = group.actions.filter(a => a.type === 'Attack')
  const tacticals = group.actions.filter(a => a.type === 'Tactical')
  return (
    <div className="cc-feature-group">
      <p className="cc-preamble">{buildPreamble(keyword, group.uniqueOnly, group.excludeSummonToken, 'action', group.actions.length)}</p>
      <SectionBlock title="Attack Actions" actions={attacks} color={color} />
      <SectionBlock title="Tactical Actions" actions={tacticals} color={color} />
    </div>
  )
}

export default function CrewCardFront({ card }: { card: CrewCardData }) {
  const faction = getFaction(card.faction)

  return (
    <div className="crew-card">
      <CrewCardHeader faction={card.faction} name={card.name} master={card.master} />

      <div className="cc-image-area">
        {card.imageUrl && <img src={card.imageUrl} alt="master image" className="cc-image" />}
      </div>

      <div className="cc-features">
        {card.abilityGroups.map(g => (
          <AbilityGroupBlock key={g.id} group={g} keyword={card.keyword} color={faction.color} />
        ))}
        {card.actionGroups.map(g => (
          <ActionGroupBlock key={g.id} group={g} keyword={card.keyword} color={faction.color} />
        ))}
      </div>

      <div className="cc-footer">Crew Card</div>
    </div>
  )
}
