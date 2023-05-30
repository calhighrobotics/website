import type { Component } from 'solid-js';

import logo from '../roboticslogo.png';
import teama from "../assets/teama.png"
import teamb from "../assets/teamb.png"
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
    <div class="flex flex-col text-white mx-auto font-manrope">
      <div class="mx-auto font-bold text-3xl glowWhite ">
        {props.name}
      </div>
      <img src={props.image} class="w-[45%] mx-auto py-4"></img>
      <div class="mx-auto font-light text-xl pb-10">
        {props.members.join(" • ")}
      </div>
      {
         props.achievements.map((e) => {
          return (
            <div class="mx-auto font-light text-l  ">
            {"- " + e + "\n"}
          </div>
          )
         })
      }


    </div>
  )
}

const Teams: Component = () => {
  return (
    <div class="h-screen w-full">
      <Navbar></Navbar>
        <div class="bg-black h-screen flex flex-col w-full break-normal"> 
          <text class="font-manrope font-bold text-orange-600 mx-auto text-5xl pt-20 break-all overflow-auto whitespace-normal">The Grizzlies</text>
          <p class="font-manrope font-bold text-white mx-auto pl-5 text-xl break-normal text-ellipsis whitespace-normal text-center">California High School Fightin' Grizzlies Robotics competes in the VEX universe. Initially started by a group of highschoolers in 2005, Cal High competed in FIRST robotics. We won regionals in 2007, but later switched into VEX in 2012. Now, we have made a name for ourselves with outstanding design</p>
          <div class="flex flex-row w-full pt-5"> 
            <Team name="Team 1516A" image={teama} members={["Alejandro", "Sachit", "Sushrut", "Yashica"]} achievements={["Made it to states in VRC Tipping Point 21-22", "Made it to states in VRC Spin Up 21-22"]}></Team>
            <Team name="Team 1516B" image={teamb} members={["Jason", "Kadon", "Prisha", "Xinrong"]} achievements={["Made it to states in VRC Tipping Point 21-22", "Made it to states in VRC Spin Up 21-22"]}></Team>
          </div>
        </div>
      </div>
    
  )
};

export default Teams;