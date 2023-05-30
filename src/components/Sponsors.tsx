import type { Component } from 'solid-js';

import logo from '../roboticslogo.png';
import '../App.module.css';
import Navbar from './Navbar';




const Contact: Component = () => {
  return (
    <div>
      <Navbar></Navbar>
        <div class="bg-black h-screen  flex flex-col"> 
          <text class="font-manrope font-bold text-orange-600 mx-auto text-5xl pt-20 glowOrange">Sponsors</text>
          
        </div>
    </div>
  )
};

export default Contact;