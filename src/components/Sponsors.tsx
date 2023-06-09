import type { Component } from 'solid-js';

import logo from '../roboticslogo.png';
import '../App.module.css';
import Navbar from './Navbar';
import sponsor from '../assets/sponsor.pdf'
import realtyone from '../assets/sponsors/realtyone.jpg'




const Contact: Component = () => {
  
  return (
    <div>
      <Navbar></Navbar>
        <div class="bg-black flex min-h-screen flex-col"> 
          <text class="font-manrope font-bold text-orange-600 mx-auto text-5xl pt-20 glowOrange">Sponsors</text>
          <p class="font-manrope font-bold text-white mx-auto pl-5 text-xl break-normal text-ellipsis whitespace-normal text-center">
            We are a organization that promotes and fosters STEM within our community. Please read below to consider sponsoring us, and we greatly thank out current sponsors for helping in our mission to educate and encrich children in the field of STEM. Benefits include having your logo on our website, mechandise, and robot, which can be great marketing. We are also school-affiliated so all donations are tax-deductable!
          </p>
          <text class="font-manrope font-bold text-orange-600 mx-auto text-2xl pt-20 glowOrange">Our gracious sponsors</text>
          <img class="mx-auto h-[9vw]" src={realtyone}/>
          <text class="font-manrope font-bold text-orange-600 mx-auto text-3xl pt-20 glowOrange">Sponsorship Packet</text>
          <p class="font-manrope font-bold text-white mx-auto pl-5 text-xl break-normal text-ellipsis whitespace-normal text-center">
            Below is a document that contains information on how to sponsor us! 
          </p>
          <div class="pt-8"></div>
          <iframe src="/web/viewer.html?file=sponsor.pdf" class="w-[min(90vh,90vw)] mx-auto inline-block aspect-[9/11.5]"></iframe>
          <div class="pt-8"></div>
        </div>
    </div>
  )
};

export default Contact;