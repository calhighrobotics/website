import type { Component } from 'solid-js';

import logo from '../roboticslogo.png';
import teama from "../assets/teama.png"
import teamb from "../assets/teamx-2026.png"
import '../App.module.css';
import Navbar from './Navbar';

interface TeamPanel {
  name: string
  image: any
  achievements: string[]
  members: string[]
}

const Team: Component<TeamPanel> = (props: TeamPanel) => {
  return (
    <div class="flex flex-col items-center text-white font-manrope">
      <div class="text-center font-bold text-3xl glowWhite ">
        {props.name}
      </div>
      <img src={props.image} class="w-full max-h-[30rem] object-contain p-5"></img>
      <div class="text-center font-light text-xl pb-10">
        {props.members.join(" • ")}
      </div>
      <div class="w-fit">
      {
         props.achievements.map((e) => {
          return (
            <div class="text-left w-fit font-light">
            {"- " + e + "\n"}
          </div>
          )
         })
      }
      </div>
    </div>
  )
}

const Teams: Component = () => {
  return (
    <div class="h-screen w-full">
      <Navbar></Navbar>
        <div class="bg-black min-h-screen flex flex-col w-full break-normal"> 
          <text class="font-manrope font-bold text-orange-600 mx-auto text-5xl pt-20 break-all overflow-auto whitespace-normal">The Grizzlies</text>
          <p class="font-manrope font-bold text-white mx-auto pl-5 text-xl break-normal text-ellipsis whitespace-normal text-left max-w-7xl">California High School Fightin' Grizzlies Robotics competes in the VEX universe. Initially started by a group of highschoolers in 2005, Cal High competed in FIRST robotics. We won regionals in 2007, but later switched into VEX in 2012. Now, we have made a name for ourselves with outstanding design. In 2026, team 1516X qualified (through design) for the VEX World Championship, the first time a Cal High team has done so.</p>
          <div class="flex flex-col md:flex-row justify-center pt-5"> 
            <Team name="Team 1516A" image={teama} members={["Sushrut", "Evan", "Yazhini", "Benjamin", "Sirseelan"]} achievements={["VRC Tipping Point 21-22: Qualified to States", "VRC Spin Up 21-22: Qualified to States", "VRC Over Under 23-24: Qualified to States, 1x Excellence Award, 2x Design Award", "VRC High Stakes 24-25: 1x Design Award, 1x Inspire Award"]}></Team>
            <Team name="Team 1516X" image={teamb} members={["Christon", "Aditya", "Avery", "Lucas", "Omkar", "Pratik", "Matthew", "Balaji"]} achievements={["VRC Tipping Point 21-22: Qualified to States", "VRC Spin Up 22-23: Qualified to States", "VRC Over Under 23-24: Qualified to States, 2x Design Award", "VRC High Stakes 24-25: 2x Tournament Champion, 2x Design Award", "VRC Push Back 25-26: Qualified to Worlds, 3x Design Award, 1x Innovate Award"]}></Team>
          </div>
        </div>
      </div>
    
  )
};

export default Teams;
