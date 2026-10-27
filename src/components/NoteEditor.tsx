import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Note } from '../types'

interface NoteEditorProps {
  note: Note | null
  isSaving: boolean
  onCancel: () => void
  onSave: (title: string, content: string) => void
}

export function NoteEditor({ note, isSaving, onCancel, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? '')
  const [content, setContent] = useState(note?.content ?? '')
  const titleRef = useRef<HTMLInputElement>(null)
  const isEmpty = !title.trim() && !content.trim()

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  function submit() {
    if (!isEmpty && !isSaving) onSave(title, content)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Escape') onCancel()
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form className="view-enter flex h-[540px] flex-col bg-[#FAFAF8] text-[#242424] dark:bg-[#171717] dark:text-[#F5F5F5]" onKeyDown={handleKeyDown} onSubmit={(event) => { event.preventDefault(); submit() }}>
      <header className="flex h-[57px] shrink-0 items-center justify-between border-b border-[#EDEDEB] px-3 dark:border-[#333]">
        <button aria-label="Cancel and go back" className="icon-button size-8 text-[#686864] hover:bg-[#F0F0ED] hover:text-[#242424] dark:text-[#A0A0A0] dark:hover:bg-[#292929] dark:hover:text-white" onClick={onCancel} title="Back (Esc)" type="button">
          <ArrowLeft aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
        </button>
        <span className="text-[12px] font-medium text-[#999] dark:text-[#888]">{note ? 'Editing note' : 'New note'}</span>
        <button className="primary-button h-8 min-w-[58px] rounded-[9px] px-3 text-[12px] font-semibold" disabled={isEmpty || isSaving} title="Save (Ctrl/Command + Enter)" type="submit">
          {isSaving ? 'Saving' : 'Save'}
        </button>
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-5 pt-6">
        <input ref={titleRef} aria-label="Note title" className="w-full shrink-0 border-0 bg-transparent text-[25px] font-semibold leading-8 tracking-[-0.025em] outline-none placeholder:text-[#B7B7B2] dark:placeholder:text-[#5F5F5F]" maxLength={160} onChange={(event) => setTitle(event.target.value)} placeholder="Untitled" value={title} />
        <textarea aria-label="Note content" className="mt-3 min-h-0 flex-1 resize-none overflow-y-auto border-0 bg-transparent text-[15px] leading-[1.7] text-[#464642] outline-none placeholder:text-[#A8A8A3] dark:text-[#D7D7D7] dark:placeholder:text-[#666]" onChange={(event) => setContent(event.target.value)} placeholder="Start writing..." value={content} />
        <div className="mt-2 flex h-5 shrink-0 items-center justify-between text-[11px] text-[#A3A39F] dark:text-[#707070]">
          <span>{isEmpty ? 'Add a title or some text to save.' : 'Stored locally'}</span>
          <span>⌘ Enter to save</span>
        </div>
      </div>
    </form>
  )
}
