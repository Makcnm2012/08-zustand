import { Category, NewNote, Note } from "@/types/note";
import axios from "axios";


const myKey: string = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN!;
interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${myKey}`,
  }
})

export const fetchNotes = async (query: string, page: number,categoryId?: string) => {
  const res = await api.get<NoteResponse>('/notes', {
    params: {
     search: query,
      page: page,
    tag: categoryId 
   } 
  })
  return res.data;
}

export const createNote = async (newNote: NewNote) => {
  const res = await api.post<Note>('/notes', newNote )
  return res.data;
}



export const deleteNote = async (id: string) => {
  const res = await api.delete<Note>(`/notes/${id}`);
   return res.data;
}

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
   return res.data;
}


