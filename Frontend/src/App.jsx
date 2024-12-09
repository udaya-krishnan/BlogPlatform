import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import Middileware from './components/Middileware';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Middileware><HomePage /></Middileware>} />
        <Route path="/addblog" element={<Middileware><AddPage /></Middileware>} />
        <Route path="/editblog/:id" element={<Middileware><EditPage /></Middileware>} />
      </Routes>
    </Router>
  );
}

export default App;
