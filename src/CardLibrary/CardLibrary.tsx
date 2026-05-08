import './CardLibrary.css'

interface Props {
  savedCards: Array<{ id: string; label: string }>
  currentId: string | null
  onSave: () => void
  onNew: () => void
  onLoad: (id: string) => void
  onDelete: () => void
}

export default function CardLibrary({ savedCards, currentId, onSave, onNew, onLoad, onDelete }: Props) {
  return (
    <div className="card-library">
      <select
        value={currentId ?? ''}
        onChange={e => { if (e.target.value) onLoad(e.target.value) }}
      >
        <option value="" disabled>— New card —</option>
        {savedCards.map(entry => (
          <option key={entry.id} value={entry.id}>{entry.label}</option>
        ))}
      </select>
      <button onClick={onSave}>{currentId ? 'Overwrite' : 'Save'}</button>
      <button onClick={onNew}>New</button>
      {currentId && (
        <button onClick={onDelete}>Delete</button>
      )}
    </div>
  )
}
