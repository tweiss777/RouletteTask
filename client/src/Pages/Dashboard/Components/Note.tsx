import '../scss/Note.scss';
interface IProps {
    title: string;
    content: string;
    id: string;
    handleClick(id: string, title: string, content: string): void;
    handleDelete(id: string ): void
}
export default function Note({ id, title, content, handleClick }: IProps) {
    function handleClickNote() {
        handleClick(id, title, content);
    }

    return (
        <div onClick={handleClickNote} className="note-container">
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
