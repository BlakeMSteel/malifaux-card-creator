import type { CardData, Action, Trigger } from './types'
import { getFaction } from './factions'

const STAT_COLS = ['Rg', 'Skl', 'Rst', 'TN', 'Dmg'] as const

function TriggerRow({ trigger }: { trigger: Trigger }) {
  return (
    <div className="cb-trigger">
      <span className="cb-suit">{trigger.suit}</span>
      {' '}<strong><em>{trigger.name}:</em></strong>
      {trigger.requirement && <em> {trigger.requirement}</em>}
      {trigger.effect && ` ${trigger.effect}`}
    </div>
  )
}

function ActionBlock({ action }: { action: Action }) {
  const rg = action.rg === '-' ? '-' : `${action.rg}"`
  return (
    <div className="cb-action">
      <div className="cb-stat-row">
        <span className="cb-action-name">
          {action.signature && <span className="cb-sig">⚡ </span>}
          <strong>{action.name}</strong>
        </span>
        <span>{rg}</span>
        <span>{action.skl}</span>
        <span>{action.rst}</span>
        <span>{action.tn}</span>
        <span>{action.dmg}</span>
      </div>
      {action.requirement && <p className="cb-italic">{action.requirement}</p>}
      {action.effect && <p className="cb-text">{action.effect}</p>}
      {action.triggers.map(t => <TriggerRow key={t.id} trigger={t} />)}
    </div>
  )
}

function Section({ title, actions, color }: { title: string; actions: Action[]; color: string }) {
  if (actions.length === 0) return null
  return (
    <div className="cb-section">
      <div className="cb-section-header" style={{ color }}>
        <strong>{title}</strong>
        <div className="cb-col-headers">
          {STAT_COLS.map(h => <span key={h}>{h}</span>)}
        </div>
      </div>
      <hr className="cb-hr" />
      {actions.map(a => <ActionBlock key={a.id} action={a} />)}
    </div>
  )
}

export default function CardBack({ card }: { card: CardData }) {
  const faction = getFaction(card.faction)
  const attacks = card.actions.filter(a => a.type === 'Attack')
  const tacticals = card.actions.filter(a => a.type === 'Tactical')

  return (
    <div className="card card-back">
      <div className="cb-top">
        <strong>{card.name}</strong>
      </div>
      <div className="cb-body">
        <Section title="Attack Actions" actions={attacks} color={faction.color} />
        <Section title="Tactical Actions" actions={tacticals} color={faction.color} />
      </div>
      <div className="cb-bottom">{card.baseSize}</div>
    </div>
  )
}
