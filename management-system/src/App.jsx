import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import IncidentForm from './components/IncidentForm/IncidentForm';
import IncidentList from './components/IncidentList/IncidentList';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incidentform" element={<IncidentForm />} />
        <Route path="/incidentlist" element={<IncidentList />} />

      </Routes>
    </Router>
  )
}

export default App
