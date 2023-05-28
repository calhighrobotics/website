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
      <div class="mx-auto font-bold text-3xl">
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
    <div>
      <Navbar></Navbar>
        <div class="bg-black h-screen flex flex-col w-full "> 
          <text class="font-manrope font-bold text-orange-700 mx-auto text-5xl pt-20">The Grizzlies</text>
          <div class="flex flex-row w-full pt-5"> 
            <Team name="Team 1516A" image={teama} members={["Alejandro", "Sachit", "Sushrut", "Yashica"]} achievements={["Made it to states in VRC Tipping Point 21-22", "Made it to states in VRC Spin Up 21-22"]}></Team>
            <Team name="Team 1516B" image={teamb} members={["Jason", "Kadon", "Prisha", "Xinrong"]} achievements={["Made it to states in VRC Tipping Point 21-22", "Made it to states in VRC Spin Up 21-22"]}></Team>
          </div>
        </div>
      </div>
    
  )
};

export default Teams;