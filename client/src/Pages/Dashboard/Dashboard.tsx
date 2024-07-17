import './scss/Dashboad.scss';
import NoteForm from './Components/NewNoteForm';
export default function Dashboard() {
  function createNewNote(title: string, content: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <h1>Side Panel</h1>
      </div>

      <div className="main-panel">
        <div className="notes-text-container">
          <NoteForm handleSubmit={createNewNote} />
        </div>
      </div>
    </div>
  );
}
