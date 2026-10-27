import type { Note } from '../types'

const STORAGE_KEY = 'notes'

function storage(): chrome.storage.StorageArea {
  if (!globalThis.chrome?.storage?.local) throw new Error('Chrome local storage is unavailable.')
  return chrome.storage.local
}

export async function getNotes(): Promise<Note[]> {
  const result = await storage().get(STORAGE_KEY)
  return Array.isArray(result[STORAGE_KEY]) ? (result[STORAGE_KEY] as Note[]) : []
}

async function setNotes(notes: Note[]) {
  await storage().set({ [STORAGE_KEY]: notes })
}

export async function saveNote(note: Note): Promise<Note[]> {
  const notes = await getNotes()
  const index = notes.findIndex((item) => item.id === note.id)
  if (index < 0) notes.push(note)
  else notes[index] = note
  await setNotes(notes)
  return notes
}

export async function deleteNote(id: string): Promise<Note[]> {
  const notes = (await getNotes()).filter((note) => note.id !== id)
  await setNotes(notes)
  return notes
}
