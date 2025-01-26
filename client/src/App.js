import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ProfileDash from './views/ProfileDash';
import PrivateRoute from './components/PrivateRoute';
import Navbar2 from './components/Navbar2';
import FAQ from './views/FAQ';
import About from './views/About';
import { useAuth } from './components/AuthContext';

function App() {
  const { profile } = useAuth(); // Use profile state to check if user is logged in
  
  return (
    <div>
      {/* Render Navbar2 if logged in, else render Navbar */}
      {profile ? <Navbar /> : <Navbar2 />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ProfileDash />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
