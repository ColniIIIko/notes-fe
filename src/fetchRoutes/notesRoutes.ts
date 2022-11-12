import { Note, NoteResponse, NotesResponse } from '@/utils/types';
import { protectedFetchRoute } from './protectedRoutes';

export const getUserNotes = (token: string) =>
  protectedFetchRoute<NotesResponse>('/users/notes', token, 'GET', 'cannot get posts');

export const getUserNote = (token: string, noteId: string) =>
  protectedFetchRoute<NoteResponse>(`/users/notes/${noteId}`, token, 'GET', 'cannot get post');

export const updateUserNote = (token: string, noteId: string, payload: Note) =>
  protectedFetchRoute<NoteResponse>(
    `/users/notes/${noteId}`,
    token,
    'PUT',
    'failed updating post',
    payload
  );

export const deleteUserNote = (token: string, noteId: string) =>
  protectedFetchRoute(`/users/notes/${noteId}`, token, 'DELETE', 'filed updating post');

export const createUserNote = (token: string, payload: Note) =>
  protectedFetchRoute<NoteResponse>('/users/notes', token, 'POST', 'failed creating note', payload);
