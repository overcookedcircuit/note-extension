import { Trash2 } from 'lucide-react'
import type { Note } from '../types'

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (note: Note) => void
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp)
  const today = new Date()

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  }

  return date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() === today.getFullYear() ? undefined : 'numeric',
  })
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const label = note.title.trim() || 'Untitled'

  return (
    <article className="group relative border-b border-[#EDEDEB] last:border-b-0 dark:border-[#333333]">
      <button
        aria-label={`Open ${label}`}
        className="note-row block w-full rounded-xl px-3 py-3.5 text-left outline-none transition-colors duration-150 hover:bg-[#F5F5F2] focus-visible:bg-[#F5F5F2] focus-visible:shadow-[inset_0_0_0_2px_#F5B942] active:bg-[#EFEFEB] dark:hover:bg-[#222222] dark:focus-visible:bg-[#222222] dark:active:bg-[#292929]"
        onClick={() => onEdit(note)}
        type="button"
      >
        <h2 className="truncate pr-9 text-[14px] font-semibold leading-5 tracking-[-0.01em] text-[#242424] dark:text-[#F5F5F5]">{label}</h2>
        <p className="mt-1 line-clamp-2 min-h-10 whitespace-pre-wrap pr-7 text-[13px] leading-5 text-[#888888] dark:text-[#A0A0A0]">
          {note.content.trim() || 'No additional text'}
        </p>
        <time className="mt-2 block text-[11px] font-medium tabular-nums text-[#A3A39F] dark:text-[#777]" dateTime={new Date(note.updatedAt).toISOString()}>
          Edited {formatDate(note.updatedAt)}
        </time>
      </button>
      <button
        aria-label={`Delete ${label}`}
        className="icon-button absolute right-3 top-3 z-10 size-7 translate-x-1 text-[#999] opacity-0 hover:bg-[#EBEBE7] hover:text-[#6D6D68] focus-visible:translate-x-0 focus-visible:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 dark:hover:bg-[#333] dark:hover:text-[#D0D0D0]"
        onClick={() => onDelete(note)}
        type="button"
      >
        <Trash2 aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
      </button>
    </article>
  )
}
