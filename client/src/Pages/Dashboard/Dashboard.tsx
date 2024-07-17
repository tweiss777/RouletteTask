import './scss/Dashboad.scss';
export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <h1>Side Panel</h1>
      </div>

      <div className="main-panel">
        <div className="notes-text-container">
          <h1>Create Note</h1>
        </div>
      </div>
    </div>
  );
}
