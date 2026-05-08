import type { Action, ActionType } from '../types'
import { ActionBlock } from './ActionBlock'
import './ActionSection.css'

const STAT_COLS = ['Rg', 'Skl', 'Rst', 'TN', 'Dmg'] as const

const ACTION_TYPES: { type: ActionType; title: string }[] = [
  { type: 'Attack', title: 'Attack Actions' },
  { type: 'Tactical', title: 'Tactical Actions' },
]

function Section({ title, actions, color }: { title: string; actions: Action[]; color: string }) {
  if (actions.length === 0) return null
  return (
    <div className="act-section">
      <div className="act-section-header" style={{ color }}>
        <strong>{title}</strong>
        <div className="act-col-headers">
          {STAT_COLS.map(h => <span key={h}>{h}</span>)}
        </div>
      </div>
      <hr className="act-hr" />
      {actions.map(a => <ActionBlock key={a.id} action={a} />)}
    </div>
  )
}

export function ActionSection({ actions, color }: { actions: Action[]; color: string }) {
  return (
    <>
      {ACTION_TYPES.map(({ type, title }) => (
        <Section key={type} title={title} actions={actions.filter(a => a.type === type)} color={color} />
      ))}
    </>
  )
}
