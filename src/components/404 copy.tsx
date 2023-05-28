import type { Component } from 'solid-js';

import logo from '../roboticslogo.png';
import '../App.module.css';
import Navbar from './Navbar';




const Teams: Component = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section class="bg-black h-screen w-full">
        <div class="bg-black h-screen  flex"> 
          <text class="font-manrope font-bold text-orange-700 m-auto text-9xl">Team 1516</text>
          
        </div>
      </section>
      <section class="bg-black h-screen  w-full">
        <div class="bg-black h-screen flex"> 
          <text class="font-manrope font-bold text-orange-700 m-auto text-9xl">Team 1516</text>
          
        </div>
      </section>
    </div>
    
  )
};

export default Teams;