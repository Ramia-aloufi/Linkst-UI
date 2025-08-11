
import './App.css'
import Home from './components/home/Home';
import Message from './components/message/Message';
import Profile from './components/profile/Profile';
import Reels from './components/reels/Reels';
import Authentication from './pages/authentication/authentication'
import HomeLayout from './pages/home/HomeLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GetUserProfile } from './redux/profile/ProfileService';
import type { AppDispatch } from './redux/Store';
import { getPosts } from './redux/post/PostService';
import { Community } from './pages/Community';


import { ThemeProvider } from './context/ThemeContext';
import NotFound from './pages/NotFound';


function App() {

  const dispatch = useDispatch<AppDispatch>()
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      dispatch(GetUserProfile())
      dispatch(getPosts(0))
    }
    initialized.current = true
  }, [dispatch])

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
