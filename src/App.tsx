/**
 * @file App.css
 * @description Main component and entry point
 * @author Destiny
 * @date 2025-01-31
 */
import { EngagementForm } from './components/EngagementForm'
import './App.css'
import logo from './assets/Logo.png'; // Adjust the path if needed

function App() {
  return (
    <div className="app">
      <div className="logo-container">
        /* Display logo*/
        <img src={logo} alt="PBS Logo" className="logo" />

       <div className="header-container">
          /* Display Header*/
          <h1>User Engagement Form</h1>
       </div>

       <div className="form-container">
         /* Display Form*/
         <EngagementForm />
        </div>
      </div>
    </div>
  );
}
export default App
