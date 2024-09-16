import type { Component } from 'solid-js';

import logo from '../roboticslogo.png';
import '../App.module.css';
import Navbar from './Navbar';




const Apply: Component = () => {
  window.location.href = "https://forms.gle/RMvUMrdp2HVoj4yu8"
  
  return (
    
    <div>
        <div class="bg-black h-screen  flex"> 
          <text class="font-manrope font-bold text-orange-600 m-auto text-9xl">Redirecting...</text>
        </div>
    </div>
    
  )
};

export default Apply;
