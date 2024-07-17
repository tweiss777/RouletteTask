import '../scss/NoteForm.scss';
import { useState } from 'react';
interface IProps {
  handleSubmit(title: string, content: string): void;
}

export default function NoteForm({ handleSubmit }: IProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  function submit() {
    handleSubmit(title, content);
  }

  return (
    <div className="new-note-form-container">
      <div className="title-container">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="content-container">
        <textarea
          name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="submit-container">
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}
