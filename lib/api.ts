import { NewNote, Note } from '@/types/note';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<FetchNotesResponse>('/notes', {
    params: {
      perPage: 12,
      page,
      search,
      tag,
    },
  });

  return data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', newNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNotesById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

// проверка лоадинг
// export const fetchNotesById = async (id: string): Promise<Note> => {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   const { data } = await instance.get<Note>(`/notes/${id}`);
//   return data;
// };
// проверка ошибки
// export const fetchNotesById = async (id: string): Promise<Note> => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   throw new Error('Test error: could not fetch note');
// };
