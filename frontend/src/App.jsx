import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx'; // Assuming the 'home' file exports a React component called Home
import './App.css';
import Login from './pages/login.jsx';
import Password from './pages/password.jsx';
import FormExample from './pages/Empform.jsx';
import Navbar from './pages/Nav.jsx';
import EmployeeManagement from './pages/Searchfileter.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pass" element={<Password />} />
        <Route path="/form" element={<FormExample />} />
        <Route path="/search" element={<EmployeeManagement />} />
      </Routes>
    </>
  );
}

export default App;
