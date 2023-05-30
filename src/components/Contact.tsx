import { createSignal, type Component, Show, createEffect, onMount } from "solid-js";

import logo from "../roboticslogo.png";
import "../App.module.css";
import Navbar from "./Navbar";
import { redirect } from "solid-start/server";
import Email from "./smtp";

interface Qprops {
  text: string;
  required: boolean;
  nopad?: boolean
}

const Question: Component<Qprops> = (props: Qprops) => {
  console.log(props.required);
  const [req, sreq] = createSignal(props.required);
  return (
    <div class={"font-manrope font-light text-white text-s pt-1 glowWhite " + ((!props.nopad) ? "superpad" : "")}>
      {props.text} <text class="text-red-500">{props.required && "*"}</text>
    </div>
  );
};

interface TextProps {
  placeholder: string;
  setContent: any;
  required: boolean;
  pad?: boolean
  email?: boolean
  phone?: boolean
}

const ShortText: Component<TextProps> = (props: TextProps) => {
  return (
    <div class="superpad pt-1 pb-1 ">
      <input
        type={props.phone ? "tel" : (props.email ? "email" : "text")}
        id="first_name"
        name="chromedosentcareboutthis"
        class="bg-transparent border border-orange-500 text-white text-sm rounded-lg focus:ring-orange-500 focus:orange-400 block coolw p-2.5"
        placeholder={props.placeholder}
        required={props.required}
        onInput={(e) => { props.setContent(e.target.value) }}
        pattern={props.phone ? "^(\\+\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$" : undefined}
      />
    </div>
  );
};

const Message: Component<TextProps> = (props: TextProps) => {
  return (
    <div class="superpad pt-1 pb-1">
      <textarea
        id="first_name"
        name="chromedosentcareboutthis"
        class="bg-transparent border border-orange-500 text-white text-sm rounded-lg focus:ring-orange-500 focus:orange-400 block coolw p-2.5 h-60"
        placeholder={props.placeholder}
        required={props.required}
        onInput={(e) => { props.setContent(e.target.value) }}
      />
    </div>
  );
};

interface CheckProps {
  style: any;
  setStyle: any;
  reasons: any;
  setReasons: any;
  empty: any;
  setEmpty: any
}

const Checkboxes: Component<CheckProps> = (props: CheckProps) => {
  const reasonMap = {
    general: false,
    ms: false,
    summer: false,
    join: false,
    sponsor: false
  };

  const schoolReasons = ["ms", "summer", "join"]

  const reasonsList: (keyof typeof reasonMap)[] = ["general", "ms", "summer", "join", "sponsor"]

  const [internalempty, setInternalempty] = createSignal(false);

  const handleClick = (reason: keyof typeof reasonMap) => {
    reasonMap[reason] = !reasonMap[reason]
    const temp: string[] = []
    let sponsor = false
    let child = false
    let any = false
    for (const i of reasonsList) {
      if (reasonMap[i] == true) {
        console.log(i)
        any = true
        if (i == "sponsor") sponsor = true
        if (schoolReasons.includes(i)) child = true
        temp.push(i)
      }
    }
    createEffect(() => {
      props.setEmpty(!any)
      setInternalempty(!any)
      props.setReasons(temp)
      const style = []
      if (sponsor) style.push("sponsor")
      if (child) style.push("child")
      props.setStyle(style)
    })
  };

  return (
    <div class="flex flex-col items-right pt-2 mb-4">
      <div class="flex items-center mb-2 superpad">
        <input
          checked={false}
          id="orange-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-orange-500 bg-transparent border-black rounded ring-orange-600 ring-2 "
          onClick={() => handleClick("general")}
        />
        <label
          for="orange-checkbox"
          class="ml-2 text-sm font-medium text-orange-600 dark:text-orange-600"
        >
          General
        </label>
      </div>
      <div class="flex items-center mb-2 superpad">
        <input
          checked={false}
          id="orange-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-orange-500 bg-transparent border-black rounded ring-orange-600 ring-2 "
          onClick={() => handleClick("ms")}
        />
        <label
          for="orange-checkbox"
          class="ml-2 text-sm font-medium text-orange-600 dark:text-orange-600"
        >
          Middle School Event
        </label>
      </div>
      <div class="flex items-center mb-2 superpad">
        <input
          checked={false}
          id="orange-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-orange-500 bg-transparent border-black rounded ring-orange-600 ring-2 "
          onClick={() => handleClick("summer")}
        />
        <label
          for="orange-checkbox"
          class="ml-2 text-sm font-medium text-orange-600 dark:text-orange-600"
        >
          Summer Camp
        </label>
      </div>
      <div class="flex items-center mb-2 superpad">
        <input
          checked={false}
          id="orange-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-orange-500 bg-transparent border-black rounded ring-orange-600 ring-2 "
          onClick={() => handleClick("join")}
        />
        <label
          for="orange-checkbox"
          class="ml-2 text-sm font-medium text-orange-600 dark:text-orange-600"
        >
          Joining the team
        </label>
      </div>
      <div class="flex items-center superpad">
        <input
          checked={false}
          id="orange-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-orange-500 bg-transparent border-black rounded ring-orange-600 ring-2 "
          onClick={() => handleClick("sponsor")}
        />
        <label
          for="orange-checkbox"
          class="ml-2 text-sm font-medium text-orange-600 dark:text-orange-600"
        >
          Sponsorship
        </label>
      </div>
      <text class="font-manrope font-light text-red-600 superpad text-xs pt-2 pb-5">
        {internalempty() && "Make sure to select at least one option, if unsure, select \"General\""}
      </text>
    </div>
  );
};
//<Question text="Please select the nature of your inquiry:"></Question>

const Contact: Component = () => {
  type styles = "sponsor" | "child";
  const [style, setStyle] = createSignal<styles[]>([]);
  const [reasons, setReasons] = createSignal([]);
  const [name, setName] = createSignal("");
  const [surname, setSurname] = createSignal("");
  const [phone, setPhone] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [school, setSchool] = createSignal("");
  const [company, setCompany] = createSignal("");
  const [body, setBody] = createSignal("");
  const [emptySelect, setEmptySelect] = createSignal(true);

  const token = "a89d25dd-53ca-44cc-9226-df0e18ef089a"

  const submitForm = () => {

    if (emptySelect()) {
      alert("Please select the nature of your inquiry")
      return
    }
    const subject = `Website message from ${email()}`
    const header = "New reply from the website contact form! DO NOT RESPOND TO THIS EMAIL, FOLLOW UP USING THE BELOW EMAIL ADDRESS. <br>"
    const emailStr = `Email: ${email()} <br>`
    const reasonsStr = `Reasons: ${reasons().join(", ")} <br>`
    const nameStr = `First Name: ${name()} \nLast Name: ${surname()} <br>`
    const phoneStr = `Phone: ${phone() || "N/A"} <br>`
    const schoolStr = `School: ${school() || "N/A"} <br>`
    const companyStr = `Company: ${company() || "N/A"} <br>`
    const bodyStr = `Body: <br> ${body()}`

    const totalBody = header + emailStr + reasonsStr + nameStr + phoneStr + schoolStr + companyStr + bodyStr

    console.log(totalBody)

    Email.send({
      SecureToken: token,
      To: 'calhighrobotics@gmail.com',
      From: "calhighrobotics@gmail.com",
      Subject: subject,
      Body: totalBody
    }).then(() => { window.location.href = "/formsubmitted" }).catch((e) => console.log(e))


  }

  onMount(() => {
    document.getElementById('contactform')?.addEventListener('submit', function (e) {
      console.log("e")
      e.preventDefault(); //to prevent form submission
      submitForm()

    });
  })

  return (
    <form id="contactform">
      <div class="bg-black h-screen overflow-auto">
        <Navbar></Navbar>
        <div class="bg-black h-screen  flex flex-col">
          <text class="font-manrope font-bold text-orange-600 mx-auto text-5xl pt-20">
            Contact Us
          </text>
          <text class="font-manrope font-light text-white mx-auto text-xl pt-2 glowWhite pb-5 whitespace-normal px-5">
            Interested in joining one of our programs or sponsoring us? Have a
            general question? Submit a response to get your questions answered.
          </text>
          <hr class="mx-auto w-[90%] border-[0.5px] border-orange-600"></hr>
          <div class="pt-4"></div>
          <Question
            text="Please select the nature of your inquiry (you may select multiple):"
            required={true}
          ></Question>
          <Checkboxes
            style={style}
            setStyle={setStyle}
            reasons={reasons}
            setReasons={setReasons}
            empty={emptySelect}
            setEmpty={setEmptySelect}
          />

          <Question text="First Name:" required={true}></Question>
          <ShortText required={true} setContent={setName} placeholder="John" pad />
          <div class="pt-4" />
          <Question text="Last Name:" required={true}></Question>
          <ShortText
            required={true}
            setContent={setSurname}
            placeholder="Doe"
          />
          <div class="pt-4" />
          <Question text="Email Address:" required={true}></Question>
          <ShortText
            required={true}
            setContent={setEmail}
            placeholder="john.doe@example.com"
            pad
            email
          />
          <div class="pt-4" />
          <Question text="Phone Number:" required={false} ></Question>
          <ShortText
            required={false}
            setContent={setPhone}
            placeholder="Only in numbers, eg: +10123456"
            phone
          />

          {style().includes("child") && (
            <>
              <div class="pt-4" />
              <Question text="School and Grade:" required={true}></Question>
              <ShortText
                required={true}
                setContent={setSchool}
                placeholder="Pine Valley 8th, Iron Horse 6th, etc."
              />
            </>
          )}

          {style().includes("sponsor") && (
            <>
              <div class="pt-4" />
              <Question text="Company:" required={true}></Question>
              <ShortText
                required={true}
                setContent={setCompany}
                placeholder="John Doe Inc."
              />
            </>
          )}
          <div class="pt-4" />
          <Question text="Message:" required={true}></Question>
          <Message
            required={true}
            setContent={setBody}
            placeholder="Your question/comment goes here"
          />
          <div class="superpad pt-4 pb-10"><button type="submit" class="text-white bg-transparent ring-1 ring-orange-500 font-medium font-manrope rounded-lg text-m w-[10rm] px-5 py-2.5 text-center glowWhite">Submit</button></div>
        </div>

      </div>
    </form>
  );
};

export default Contact;
