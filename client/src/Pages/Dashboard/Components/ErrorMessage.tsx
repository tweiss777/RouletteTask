import '../scss/ErrorMessage.scss';
export default function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="error-container">
      <p>{error}</p>
    </div>
  );
}
