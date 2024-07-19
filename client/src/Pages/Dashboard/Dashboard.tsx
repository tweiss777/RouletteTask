import './scss/Dashboad.scss';
import NoteForm from './Components/NoteForm';
import Note from './Components/Note';
import NotesGroup from './Components/NotesGroup';
import useNotes from './hooks/useNotes';
import ErrorMessage from './Components/ErrorMessage';
export default function Dashboard() {
  const {
    logout,
    currentNote,
    setCurrentNote,
    createNewNote,
    updateNote,
    handleClickNote,
    handleUpdateCurrentNote,
    deleteNote,
    notes,
    error,
  } = useNotes();

  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <div className="notes-group-container">
          <NotesGroup>
            <>
            {notes.length === 0 && <h1>No notes yet</h1>}
            {notes.map((note) => (
              <Note
                handleDelete={deleteNote}
                handleClick={handleClickNote}
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
              />
            ))}
          </>
          </NotesGroup>
        </div>
        <div className="options-container">
          <button
            onClick={() => setCurrentNote({ id: '', title: '', content: '' })}
          >
            Add Note
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="main-panel">
        {error && <ErrorMessage error={error} />}
        <div className="notes-text-container">
          <NoteForm
            id={currentNote.id}
            title={currentNote.title}
            content={currentNote.content}
            handleSubmit={createNewNote}
            handleUpdate={updateNote}
            handleOnChange={handleUpdateCurrentNote}
          />
        </div>
      </div>
    </div>
  );
}
