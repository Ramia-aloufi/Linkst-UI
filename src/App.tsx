
import './App.css'
import Home from './components/home/Home';
import Message from './components/message/Message';
import Profile from './components/profile/Profile';
import Reels from './components/reels/Reels';
import Authentication from './pages/authentication/authentication'
import HomeLayout from './pages/home/HomeLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Community } from './pages/Community';


import { ThemeProvider } from './context/ThemeContext';
import NotFound from './pages/NotFound';


function App() {


  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="reels" element={<Reels />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/messages" element={<Message />} />
          </Route>
          <Route path="/login" element={<Authentication />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>

    </ThemeProvider>
  )
}

export default App
