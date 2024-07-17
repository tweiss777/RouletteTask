import '../scss/NoteForm.scss';
interface IProps {
    handleSubmit(title: string, content: string): void;
    handleUpdate(title: string, content: string, id?: string): void;
    handleOnChange(target: string, value: string): void
    note?: { id: string; title: string; content: string };
    title: string;
    content: string;
    id?: string;
}

export default function NoteForm({ id, title, content, note, handleSubmit, handleUpdate, handleOnChange }: IProps) {

    function submit() {
        note?.id ? handleUpdate(title, content, note.id) : handleSubmit(title, content);
    }

    return (
        <div className="new-note-form-container">
            <div className="title-container">
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                />
            </div>
            <div className="content-container">
                <textarea
                    name="content"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                />
            </div>
            <div className="submit-container">
                <button onClick={submit}>{id ? 'Update' : 'Submit'}</button>
            </div>
        </div>
    );
}
