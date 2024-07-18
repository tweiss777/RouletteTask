import axios from 'axios';
import { NewNoteDTO } from '../DTOS/newNote.dto';
import { UpdateNoteDTO } from '../DTOS/updateNote.dto';

export async function getNotes(token: string, userId: string) {
  try {
    const response = await axios.get(`/api/v1/notes/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.notes;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function createNote(token: string, newNote: NewNoteDTO) {
  try {
    const response = await axios.post(
      '/api/v1/notes',
      {
        user_id: newNote.userId,
        title: newNote.title,
        content: newNote.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.note;
  } catch (error: any) {
    throw error;
  }
}

export async function updateNote(token: string, updatedNote: UpdateNoteDTO) {
  try {
    const response = await axios.put(
      `/api/v1/notes/${updatedNote.id}`,
      {
        title: updatedNote.title,
        content: updatedNote.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.note;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteNote(token: string, noteId: number) {
  try {
    const response = await axios.delete(`/api/v1/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
}
