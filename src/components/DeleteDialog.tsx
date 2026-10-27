import { Trash2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Note } from '../types'

interface DeleteDialogProps {
  note: Note
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteDialog({ note, isDeleting, onCancel, onConfirm }: DeleteDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelRef.current?.focus()
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !isDeleting) onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isDeleting, onCancel])

  const label = note.title.trim() || 'Untitled'

  return (
    <div aria-labelledby="delete-title" aria-modal="true" className="dialog-backdrop absolute inset-0 z-20 grid place-items-center bg-[#171717]/35 p-7 backdrop-blur-[3px]" onMouseDown={(event) => { if (event.target === event.currentTarget && !isDeleting) onCancel() }} role="dialog">
      <div className="dialog-panel w-full rounded-[14px] border border-[#E4E4E1] bg-white p-5 shadow-[0_20px_55px_rgba(36,36,36,0.16)] dark:border-[#3A3A3A] dark:bg-[#222222] dark:shadow-[0_20px_55px_rgba(0,0,0,0.45)]">
        <div className="grid size-9 place-items-center rounded-[10px] bg-[#F4F4F1] text-[#777] dark:bg-[#2D2D2D] dark:text-[#B0B0B0]">
          <Trash2 aria-hidden="true" className="size-4" strokeWidth={1.7} />
        </div>
        <h2 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-[#242424] dark:text-[#F5F5F5]" id="delete-title">Delete this note?</h2>
        <p className="mt-1.5 text-[13px] leading-5 text-[#888] dark:text-[#A0A0A0]">“{label}” will be permanently removed. This can’t be undone.</p>
        <div className="mt-5 flex justify-end gap-2">
          <button ref={cancelRef} className="secondary-button h-9 rounded-[10px] px-3.5 text-[12px] font-semibold" disabled={isDeleting} onClick={onCancel} type="button">Cancel</button>
          <button className="danger-button h-9 rounded-[10px] px-3.5 text-[12px] font-semibold" disabled={isDeleting} onClick={onConfirm} type="button">{isDeleting ? 'Deleting...' : 'Delete note'}</button>
        </div>
      </div>
    </div>
  )
}
