import { Component } from "solid-js"
import logo from '../roboticslogo.png';
import '../App.module.css';
import { A } from "@solidjs/router";
import {createStore} from "solid-js/store"


  


 const Navbar: Component = () => {
    return (
        <>
        <div class="h-16 w-full fixed opacity-30 bg-slate-700"/>
        <A href="/"><img src={logo} class="h-16 w-16 fixed px-2.5 py-2.5 opacity-100"/></A>
        <div class="fixed h-16 py-4 font-manrope  text-white right-10 flex">
            <A href="/"><button class="hover:font-bold px-1.5 ">Home</button></A>
            <A href="/teams"><button class="hover:font-bold px-1.5">Teams</button></A>
            <A href="/events"><button class="hover:font-bold px-1.5">Events</button></A>
            <A href="/contact"><button class="hover:font-bold px-1.5">Contact</button></A>
            <A href="/sponsor"><button class="hover:font-bold px-1.5">Sponsors</button></A>
        </div>
        </>

    )
}

export default Navbar

