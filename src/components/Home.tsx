import type { Component } from 'solid-js';

import logo from '../roboticslogo.png';
import '../App.module.css';
import Navbar from '../components/Navbar';
import { A } from '@solidjs/router';

interface FancyProps {
    link: string
    text: string
}

const FancyButton: Component<FancyProps> = (props: FancyProps) => {
    return (
        <A href={props.link}><button class="rounded-md bg-opacity-30 bg-gray-700 font-light text-white font-manrope text-2xl hover:font-bold hover:bg-opacity-10 glowWhite "><div class="py-2 px-10">{props.text}</div></button></A>
    )
}

const Home: Component = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section class="bg-black h-screen w-screen ">
        <div class="bg-black h-screen flex flex-col space-y-0 "> 
            <div class="flex flex-col m-auto select-none">
                <text class="font-manrope font-bold text-orange-600 mx-auto text-9xl will-change-auto ">Team 1516</text>
                <text class="font-manrope font-bold text-white mx-auto glowWhite ">California High School Robotics Club</text>
                <div class="flex flex-row my-auto select-none pt-40 space-x-40">
                    <FancyButton link="/teams" text="Teams"></FancyButton>
                    <FancyButton link="/events" text="Events"></FancyButton>
                    <FancyButton link="/contact" text="Contact"></FancyButton>
                </div>
            </div>

        </div>

      </section>
    </div>
    
  )
};

export default Home;