import axios from 'axios';

import type { Note, NewNote } from '../types/note';

interface HTTPGetResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  currentPage: number,
  search: string,
  category?: string
): Promise<HTTPGetResponse> => {
  const getParams = {
    params: {
      search,
      page: currentPage,
      perPage: 12,
      tag: category,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };

  const data = await axios.get<HTTPGetResponse>(
    'https://notehub-public.goit.study/api/notes',
    getParams
  );

  return data.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const postParams = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };

  const { data } = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    note,
    postParams
  );

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const deleteParams = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };

  const { data } = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    deleteParams
  );
  return data;
};

export const getSingleNote = async (id: string) => {
  const getSingleParams = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };

  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    getSingleParams
  );

  return data;
};