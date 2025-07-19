
import { ThemeProvider } from '@mui/material';
import './App.css'
import Home from './components/Home';
import Message from './components/message/Message';
import Profile from './components/profile/Profile';
import Reels from './components/Reels';
import ReelsForm from './components/ReelsForm';
import Authentication from './pages/authentication/authentication'
import HomeLayout from './pages/home/HomeLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkTheme } from './theme/DarkTheme';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GetUserProfile } from './redux/profile/ProfileService';
import type { AppDispatch } from './redux/Store';
import { getPosts } from './redux/post/PostService';




function App() {

    const dispatch = useDispatch<AppDispatch>()
    const initialized = useRef(false);
 

  useEffect(()=>{
    if(!initialized.current){
    dispatch(GetUserProfile())
    dispatch(getPosts(0))}
    initialized.current = true
  },[dispatch])

  return (
        <ThemeProvider theme={DarkTheme}>
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

    </ThemeProvider>
  )
}

export default App
