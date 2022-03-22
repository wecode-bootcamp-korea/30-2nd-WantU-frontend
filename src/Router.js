import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Mypage from './pages/Mypage/Mypage';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Job from './pages/Job/Job';

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job/:id" element={<Job />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
