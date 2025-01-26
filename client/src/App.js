import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ProfileDash from './views/ProfileDash';
import FAQ from './views/FAQ';
import About from './views/About';


function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProfileDash />} />
        <Route path="/FAQ" element={<FAQ/>} />
        <Route path="/about" element={<About/>} />

      </Routes>
    </div>
  );
}

export default App;
