import type { Component } from 'solid-js';

import logo from '../roboticslogo.png';
import '../App.module.css';
import Navbar from './Navbar';
import { A } from '@solidjs/router';




const FormSubmitted: Component = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section class="bg-black h-screen w-full">
        <div class="bg-black h-screen  flex flex-col"> 
          <text class="font-manrope font-bold text-orange-600 mx-auto text-9xl pt-60 whitespace-normal">Form Submitted</text>
          <text class="font-manrope font-bold text-white mx-auto text-xl glowWhite whitespace-normal"><A href="/">Click here to go the homepage</A></text>
        </div>
      </section>
    </div>
    
  )
};

export default FormSubmitted;