
import './App.css'
import Home from './components/Home';
import Message from './components/message/Message';
import Profile from './components/profile/Profile';
import Reels from './components/Reels';
import ReelsForm from './components/ReelsForm';
import Authentication from './pages/authentication/authentication'
import HomeLayout from './pages/home/HomeLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  return (
        <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="reels" element={<Reels />} />
            <Route path="new-reels" element={<ReelsForm />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Authentication />} />
          <Route path="/messages" element={<Message />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
