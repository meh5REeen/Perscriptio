import React from 'react'
import Home from './pages/Home';
import {Routes , Route} from 'react-router-dom';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import Appointment from './pages/Appointment';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:speciality" element={<Doctors/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/my-appointments" element={<Elements stripe={stripePromise}>
      <Appointments />
    </Elements>}/>
        <Route path="/appointment/:docId" element={<Appointment/>}/>

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

      <Footer/>
    </div>
  )
}

export default App;
