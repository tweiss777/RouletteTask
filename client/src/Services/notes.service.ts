import axios from 'axios';
import { NewNoteDTO } from '../DTOS/newNote.dto';
import { UpdateNoteDTO } from '../DTOS/updateNote.dto';
import BadRequestException from '../Errors/badRequest.exception';
import InternalServerError from '../Errors/internal.exception';

export async function getNotes(token: string, userId: string) {
  try {
    const response = await axios.get(`/api/v1/notes/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.notes;
  } catch (error: any) {
        if(error.response.status === 400){
            throw new BadRequestException(error.response.data.message);
        }
    throw new InternalServerError("Something went wrong");
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
        if(error.response.status === 400){
            throw new BadRequestException(error.response.data.message);
        } 
    throw new InternalServerError('Something went wrong');
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
        throw new InternalServerError('Something went wrong');
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
    if(error.response.status === 400){
        throw new BadRequestException(error.response.data.message);
    }
    throw new InternalServerError('Something went wrong');
  }
}
