import { useState, useEffect } from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
import * as notesService from '../../../Services/notes.service';
import { NewNoteDTO } from '../../../DTOS/newNote.dto';
import { Note } from '../../../types/Note';
import BadRequestException from '../../../Errors/badRequest.exception';
import NotFoundException from '../../../Errors/notFound.exception';
export default function useNotes() {
    const { logout, userId, token, isAuthenticated } = useAuthContext();
    const [currentNote, setCurrentNote] = useState<Note>({
        id: '',
        title: '',
        content: '',
    });
    const [notes, setNotes] = useState<Note[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function get(){
            if(userId) await getNotes();
        }
        get()

    },[isAuthenticated, userId]);


    async function createNewNote(title: string, content: string) {
        try {
            const newNoteDto: NewNoteDTO = {
                userId,
                title,
                content,
            };
            if (error) setError('');
            const newNote = await notesService.createNote(token, newNoteDto);
            setNotes([...notes, newNote]);
        } catch (error: any) {
            if (error instanceof BadRequestException) {
                setError(error.message);
                return;
            }
            setError('Something went wrong');
        }
    }
    async function updateNote(title: string, content: string, id: string) {
        try {
            if(error) setError('');
            const updatedNote = await notesService.updateNote(token, {
                title,
                content,
                id,
            });
            const updatedNotes = notes.map((note) =>
                note.id === id ? updatedNote : note,
            );
            setNotes(updatedNotes);
        } catch (error: any) {
            if (error instanceof NotFoundException) {
                setError(error.message);
                return;
            }
            setError('Something went wrong');
        }
    }

    function handleClickNote(id: string, title: string, content: string) {
        setCurrentNote({ id, title, content });
    }

    function handleUpdateCurrentNote(name: string, value: string) {
        setCurrentNote({ ...currentNote, [name]: value });
    }

    async function deleteNote(id: string) {
        try {
            if(error) setError('');
            await notesService.deleteNote(token, parseInt(id));
            const updatedNotes = notes.filter((note) => note.id !== id);
            setNotes(updatedNotes);
        } catch (error) { }
    }

    async function getNotes() {
        try {
            const notes = await notesService.getNotes(token, userId);
            setNotes(notes);
        } catch (error: any) {
               if(error instanceof BadRequestException){
                   setError(error.message);                   
               }
            setError('Something went wrong');
        }
    }

    return {
        logout,
        currentNote,
        notes,
        setCurrentNote,
        createNewNote,
        updateNote,
        handleClickNote,
        handleUpdateCurrentNote,
        deleteNote,
        error
    };
}
