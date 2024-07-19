import '../scss/NoteForm.scss';
interface IProps {
    handleSubmit(title: string, content: string): void;
    handleUpdate(title: string, content: string, id?: string): void;
    handleOnChange(target: string, value: string): void
    note?: { id: string; title: string; content: string };
    title: string;
    content: string;
    id?: string;
    btnDisabled?: boolean
}

export default function NoteForm({ btnDisabled, id, title, content, handleSubmit, handleUpdate, handleOnChange }: IProps) {

    function submit() {
        console.log(id)
        id ? handleUpdate(title, content, id) : handleSubmit(title, content);
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
                <button disabled={btnDisabled} onClick={submit}>{id ? btnDisabled ? 'Updating...' : 'Update' : btnDisabled ? 'Creating...' : 'Submit'}</button>
            </div>
        </div>
    );
}
