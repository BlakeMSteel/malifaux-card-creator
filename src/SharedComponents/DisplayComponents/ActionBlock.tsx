import type { Action, Trigger } from '../../types'
import './ActionBlock.css'

export function TriggerRow({ trigger }: { trigger: Trigger }) {
  return (
    <div className="act-trigger">
      <span className="act-suit">{trigger.suit}</span>
      <span>
        <strong><em>{trigger.name}:</em></strong>
        {trigger.requirement && <em> {trigger.requirement}</em>}
        {trigger.effect && ` ${trigger.effect}`}
      </span>
    </div>
  )
}

export function ActionBlock({ action }: { action: Action }) {
  const rg = action.rg === '-' ? '-' : `${action.rg}"`
  return (
    <div className="act-action">
      <div className="act-stat-row">
        <span>
          {action.signature && <span className="act-sig">⚡ </span>}
          <strong>{action.name}</strong>
        </span>
        <span>{rg}</span>
        <span>{action.skl}</span>
        <span>{action.rst}</span>
        <span>{action.tn}</span>
        <span>{action.dmg}</span>
      </div>
      {action.requirement && <p className="act-italic">{action.requirement}</p>}
      {action.effect && <p className="act-text">{action.effect}</p>}
      {action.triggers.map(t => <TriggerRow key={t.id} trigger={t} />)}
    </div>
  )
}
