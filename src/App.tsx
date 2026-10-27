import { Check, CircleAlert, Plus, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { DeleteDialog } from './components/DeleteDialog'
import { NoteEditor } from './components/NoteEditor'
import { NoteList } from './components/NoteList'
import { SearchBar } from './components/SearchBar'
import type { Note } from './types'
import { deleteNote, getNotes, saveNote } from './utils/storage'

type View = { mode: 'list' } | { mode: 'editor'; note: Note | null }

const sortNotes = (notes: Note[]) => [...notes].sort((a, b) => b.updatedAt - a.updatedAt)
const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'Something went wrong. Please try again.'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [view, setView] = useState<View>({ mode: 'list' })
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSaved, setShowSaved] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<Note | null>(null)

  useEffect(() => {
    getNotes()
      .then((items) => setNotes(sortNotes(items)))
      .catch((reason: unknown) => setError(errorMessage(reason)))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!showSaved) return
    const timer = window.setTimeout(() => setShowSaved(false), 2200)
    return () => window.clearTimeout(timer)
  }, [showSaved])

  const visibleNotes = useMemo(() => {
    const term = query.trim().toLocaleLowerCase()
    return term
      ? notes.filter((note) => note.title.toLocaleLowerCase().includes(term) || note.content.toLocaleLowerCase().includes(term))
      : notes
  }, [notes, query])

  async function handleSave(title: string, content: string) {
    if (!title.trim() && !content.trim()) return
    setBusy(true)
    setError(null)
    try {
      const now = Date.now()
      const existing = view.mode === 'editor' ? view.note : null
      const note: Note = {
        id: existing?.id ?? crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      }
      setNotes(sortNotes(await saveNote(note)))
      setView({ mode: 'list' })
      setShowSaved(true)
    } catch (reason) {
      setError(errorMessage(reason))
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!pendingDelete) return
    setBusy(true)
    setError(null)
    try {
      setNotes(sortNotes(await deleteNote(pendingDelete.id)))
      setPendingDelete(null)
    } catch (reason) {
      setError(errorMessage(reason))
    } finally {
      setBusy(false)
    }
  }

  if (view.mode === 'editor') {
    return (
      <main className="relative h-[540px] w-[400px] overflow-hidden">
        <NoteEditor isSaving={busy} note={view.note} onCancel={() => { setError(null); setView({ mode: 'list' }) }} onSave={handleSave} />
        {error ? <ErrorToast message={error} onDismiss={() => setError(null)} /> : null}
      </main>
    )
  }

  return (
    <main className="relative flex h-[540px] w-[400px] flex-col overflow-hidden bg-[#FAFAF8] text-[#242424] dark:bg-[#171717] dark:text-[#F5F5F5]">
      <header className="z-10 shrink-0 border-b border-[#EDEDEB] bg-[#FAFAF8]/95 px-4 pb-3 pt-3.5 backdrop-blur-md dark:border-[#333333] dark:bg-[#171717]/95">
        <div className="mb-3 flex h-9 items-center justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <img alt="" aria-hidden="true" className="size-8 rounded-[9px]" height="32" src="/icons/icon-32.png" width="32" />
            <div className="flex min-w-0 items-baseline gap-2">
              <h1 className="text-[17px] font-semibold tracking-[-0.02em]">Notes</h1>
              <span className="text-[11px] font-medium tabular-nums text-[#999] dark:text-[#777]">{notes.length}</span>
            </div>
          </div>
          <button aria-label="Create new note" className="icon-button size-8 bg-[#F5B942] text-[#242424] shadow-[0_1px_2px_rgba(77,57,20,0.12)] hover:bg-[#F7C45C] active:bg-[#E9AD39]" onClick={() => { setError(null); setView({ mode: 'editor', note: null }) }} title="New note" type="button">
            <Plus aria-hidden="true" className="size-[17px]" strokeWidth={2} />
          </button>
        </div>
        <SearchBar onChange={setQuery} value={query} />
      </header>
      <section aria-busy={loading} aria-label="Notes list" className="min-h-0 flex flex-1 flex-col overflow-y-auto overscroll-contain">
        {loading ? <LoadingState /> : <NoteList isSearching={Boolean(query.trim())} notes={visibleNotes} onCreate={() => setView({ mode: 'editor', note: null })} onDelete={setPendingDelete} onEdit={(note) => setView({ mode: 'editor', note })} />}
      </section>
      {showSaved ? <SuccessToast /> : null}
      {error ? <ErrorToast message={error} onDismiss={() => setError(null)} /> : null}
      {pendingDelete ? <DeleteDialog isDeleting={busy} note={pendingDelete} onCancel={() => setPendingDelete(null)} onConfirm={handleDelete} /> : null}
    </main>
  )
}

function LoadingState() {
  return <div className="space-y-1 px-4 py-4" aria-label="Loading notes">
    {[0, 1, 2].map((item) => <div className="animate-pulse border-b border-[#EDEDEB] px-2 py-3.5 dark:border-[#333]" key={item}><div className="h-3 w-2/5 rounded bg-[#E8E8E4] dark:bg-[#292929]" /><div className="mt-2 h-2.5 w-4/5 rounded bg-[#EEEEEB] dark:bg-[#252525]" /><div className="mt-2 h-2.5 w-3/5 rounded bg-[#EEEEEB] dark:bg-[#252525]" /></div>)}
  </div>
}

function SuccessToast() {
  return <div className="toast-enter absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-[10px] border border-[#E1E1DE] bg-white px-3 py-2 text-[12px] font-medium text-[#4B4B47] shadow-[0_8px_25px_rgba(36,36,36,0.12)] dark:border-[#3A3A3A] dark:bg-[#292929] dark:text-[#E5E5E5]" role="status"><Check aria-hidden="true" className="size-3.5 text-[#A47720] dark:text-[#F5B942]" strokeWidth={2.2} />Note saved</div>
}

function ErrorToast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return <div className="error-toast-enter absolute inset-x-4 bottom-4 z-30 flex items-start gap-2 rounded-[11px] border border-[#E2D1CD] bg-[#FFF9F7] p-3 text-[12px] text-[#8B4135] shadow-[0_8px_25px_rgba(36,36,36,0.12)] dark:border-[#5B3731] dark:bg-[#2B211F] dark:text-[#F2B8AD]" role="alert"><CircleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" /><span className="flex-1">{message}</span><button aria-label="Dismiss error" className="icon-button -mr-1 -mt-1 size-6 hover:bg-black/5 dark:hover:bg-white/10" onClick={onDismiss} type="button"><X className="size-3.5" /></button></div>
}

export default App
