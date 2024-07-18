import '../scss/Note.scss';
interface IProps {
    title: string;
    content: string;
    id: string;
    handleClick(id: string, title: string, content: string): void;
    handleDelete(id: string ): void
}
export default function Note({ id, title, content, handleClick, handleDelete }: IProps) {
    function handleClickNote() {
        handleClick(id, title, content);
    }

    function deleteNote(){
        handleDelete(id)
    }

    return (
        <div onClick={deleteNote} className="note-container">
            <button onClick={handleClickNote}>X</button>
            <div className="title-container">
                <h3>{title}</h3>
            </div>
            <div className="content-container">
                <p>{content}</p>
            </div>
        </div>
    );
}
