import type { Component } from 'solid-js';

import scamp from '../assets/scamp.png';
import '../App.module.css';
import Navbar from './Navbar';

const message = "By the time the students finish the camp, they will have learned practical engineering, physics, and programming skills. Students will collaborate in to complete challenges, program hardware, and, at the end, they will be capable of building robots. "


const Events: Component = () => {
  return (
    <div>
      <Navbar></Navbar>
        <div class="bg-black h-screen flex flex-col w-full "> 
          <text class="font-manrope font-bold text-orange-700 mx-auto text-5xl pt-20">Events</text>
          <text class="font-manrope font-bold text-white mx-auto text-2xl pt-5">Summer Camp</text>
          <img src={scamp} class="h-[78%] w-[32%] mx-auto"></img>
        </div>
    </div>
  )
};

export default Events;