import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom"
import React from 'react'
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

import VoterServices from "./Pages/VoterServices";
import Candidates from "./Pages/Candidates";
import GeneralResults from "./Pages/GeneralResults";
import StateResults from "./Pages/StateResults";


import ForgotPassword from "./Pages/ForgotPassword";
import Footer from "./Components/Footer";

import PrivateRoute from "./utils/PrivateRoute";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import VoterRegistrationForm from "./Pages/VoterRegistrationForm.jsx";
import VoterSearch from "./Pages/VoterSearch.jsx";

import Vote from "./Pages/Vote.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/voter-services" element={<VoterServices />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/results/general" element={<GeneralResults />} />
          <Route path="/results/state" element={<StateResults />} />
          <Route path="/voter-registration" element={<VoterRegistrationForm />} />
          <Route path="/search" element={<VoterSearch />} />
          <Route path="/vote" element={<Vote />} />
          
        </Route>
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;