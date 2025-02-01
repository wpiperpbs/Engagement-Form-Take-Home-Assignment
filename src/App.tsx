import { EngagementForm } from './components/EngagementForm'
import './App.css'
import logo from './assets/Logo.png'; // Adjust the path if needed

function App() {
  return (
    <div className="app">
    <div className="logo-container">
      {/* Display the logo above the header */}
      <img src={logo} alt="PBS Logo" className="logo" />

      <div className="header-container">
        <h1>User Engagement Form</h1>
      </div>

      <div className="form-container">
        <EngagementForm />
      </div>
    </div>
  </div>
  );
}

export default App
