import '../scss/NotesGroup.scss';
interface IProps {
  children: JSX.Element | JSX.Element[];
}
export default function NotesGroup({ children }: IProps) {
  return <div className="notes-group-container">{children}</div>;
}
