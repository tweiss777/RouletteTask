import { useState } from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
export default function useNotes() {
    const { logout } = useAuthContext();
    const [currentNote, setCurrentNote] = useState({
        id: '',
        title: '',
        content: '',
    });
    const [notes, setNotes] = useState([]);
    function createNewNote(title: string, content: string) {
        throw new Error('Function not implemented.');
    }
    function updateNote(title: string, content: string, id: string) {
        throw new Error('Function not implemented.');
    }

    function handleClickNote(id: string, title: string, content: string) {
        setCurrentNote({ id, title, content });
    }

    function handleUpdateCurrentNote(name: string, value: string) {
        setCurrentNote({ ...currentNote, [name]: value });
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
    };
}
