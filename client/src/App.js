import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ProfileDash from './views/ProfileDash';
// import Login from './Login';
import PrivateRoute from './components/PrivateRoute';



function App() {
  return (
    <div>
      <Navbar />

      <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
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
