import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import FundDetails from './pages/FundDetails';
import SavedFunds from './pages/SavedFund';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fund/:schemeCode" element={<FundDetails />} />
        <Route path="/savedFund" element={<SavedFunds />} />
      </Routes>
    </Router>
  );
}
