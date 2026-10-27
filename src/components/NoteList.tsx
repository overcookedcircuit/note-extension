import { FileText, SearchX } from 'lucide-react'
import type { Note } from '../types'
import { NoteCard } from './NoteCard'

interface NoteListProps {
  notes: Note[]
  isSearching: boolean
  onCreate: () => void
  onEdit: (note: Note) => void
  onDelete: (note: Note) => void
}

export function NoteList({ notes, isSearching, onCreate, onEdit, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="view-enter flex flex-1 flex-col items-center justify-center px-10 pb-12 text-center">
        <div className="mb-5 grid size-12 place-items-center rounded-[14px] border border-[#EDEDEB] bg-white text-[#999] dark:border-[#333] dark:bg-[#222] dark:text-[#888]">
          {isSearching ? <SearchX aria-hidden="true" className="size-5" strokeWidth={1.6} /> : <FileText aria-hidden="true" className="size-5" strokeWidth={1.6} />}
        </div>
        <h2 className="text-[16px] font-semibold tracking-[-0.015em] text-[#242424] dark:text-[#F5F5F5]">
          {isSearching ? 'No notes found' : 'Your thoughts, in one place.'}
        </h2>
        <p className="mt-2 text-[13px] leading-5 text-[#888888] dark:text-[#A0A0A0]">
          {isSearching ? 'Try a different title or phrase.' : 'Capture something worth remembering.'}
        </p>
        {!isSearching ? (
          <button className="primary-button mt-6 h-9 rounded-[10px] px-4 text-[13px] font-semibold" onClick={onCreate} type="button">
            Create your first note
          </button>
        ) : null}
      </div>
    )
  }

  return (
    <div className="view-enter px-3 py-2">
      {notes.map((note) => <NoteCard key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} />)}
    </div>
  )
}
