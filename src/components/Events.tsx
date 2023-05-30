import type { Component } from 'solid-js';

import scamp from '../assets/scamp.png';
import '../App.module.css';
import Navbar from './Navbar';

const message = "By the time the students finish the camp, they will have learned practical engineering, physics, and programming skills. Students will collaborate in to complete challenges, program hardware, and, at the end, they will be capable of building robots. "


const Events: Component = () => {
  return (
    <div class="bg-black">
      <Navbar></Navbar>
        <div class="bg-black h-screen flex flex-col w-full overflow-auto "> 
          <text class="font-manrope font-bold text-orange-600 mx-auto text-5xl pt-20 whitespace-normal">Events</text>
          <text class="font-manrope font-bold text-white mx-auto text-2xl pt-5 whitespace-normal">Summer Camp</text>
          <img src={scamp} class="h-[50rem] mx-auto"></img>
        </div>
    </div>
  )
};

export default Events;