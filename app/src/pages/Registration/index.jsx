import React from 'react'

import submit from './functions/submit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
const Registration = () => {
  const [position, setPosition] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [FullName, setFullName] = React.useState('');
  const [Phone, setPhone] = React.useState('');
  const [github, setGithub] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');
  const [firsthackathon, setFirsthackathon] = React.useState(false);
  const [postmanstudentexpert, setPostmanstudentexpert] = React.useState(false);
  const [beginner, setBeginner] = React.useState(false);
  const [student, setStudent] = React.useState(false);
  const [university, setUniversity] = React.useState('');
  const [year, setYear] = React.useState('');
  const [notes, setNotes] = React.useState(" ");
  const [errcb, setErr] = React.useState([false, ""]);
  const [loading, setLoading] = React.useState(false);
  const [freeze, setFreeze] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const payload = {
    name: FullName,
    email: email,
    linkedin: linkedin,
    student: {
      status: student,
      university: university,
      year: year,
    },
    mobile: Phone,
    github: github,
    beginner: beginner,
    studentExpert: postmanstudentexpert,
    firstHackathon: firsthackathon,
  }
  const questions = [
    {
      question: "What is your full name?",
      cb: setFullName,
      status: FullName.trim() != "" ? true : false,
      type: "input",
      optional: false,
      value: FullName
      , options: {
        placeholder: "Full Name"
      }
    },
    {
      question: "Whats your github url? (Ex: https://github.com/username)",
      cb: setGithub,
      status: github.trim() != "" ? true : false,
      optional: false
      , type: "input"
      , value: github
      , options: {
        placeholder: "https://github.com/imabp"
      }

    },
    {
      question: "Whats your email address? ",
      cb: setEmail,
      status: email.trim() != "" ? true : false,
      optional: false
      , type: "input",
      value: email,
      options: {
        placeholder: "example@example.com"
      }
    },
    {
      question: "Your mobile number [Optional].",
      cb: setPhone,
      status: Phone.trim() != "" ? true : false,
      optional: true
      , type: "input"
      , value: Phone
      ,
      options: {
        placeholder: "XXXXXXXXXX"
      }
    },
    {
      question: "What's your LinkedIn URL (Ex: https://linkedin.com/in/username)",
      cb: setLinkedin,
      optional: false,
      status: linkedin.trim() != "" ? true : false
      , type: "input"
      , value: linkedin,
      options: {
        placeholder: "https://linkedin.com/in/username"
      }
    },
    {
      question: "Have you integrated / built APIs in your past projects?",
      cb: setBeginner,
      status: beginner,
      optional: false
      , type: "select"
      , value: beginner,
      options: ["Yes", "No"],
      defaultvalue: "No"

    },
    {
      question: "Is this your first hackathon?",
      cb: setFirsthackathon,
      status: firsthackathon,
      optional: false
      , type: "select"
      , value: firsthackathon,
      options: ["Yes", "No"],
      defaultvalue: "No"
    },
    {
      question: "Are you a Postman Student Expert?",
      cb: setPostmanstudentexpert,
      status: postmanstudentexpert,
      optional: false
      , type: "select"
      , value: postmanstudentexpert,
      options: ["Yes", "No"],
      defaultvalue: "No"
    },
    {
      question: "Are you a Student ?",
      cb: setStudent,
      status: student,
      optional: false
      , type: "select"
      , value: student,
      options: ["Yes", "No"],
      defaultvalue: "No"
    },
    {
      question: `What's your ${student === "Yes" ? "University/School" : "Company"} name?`,
      cb: setUniversity,
      status: university.trim() != "" ? true : false,
      optional: false
      , type: "input"
      , value: university,
      options: {
        placeholder: student === "Yes" ? "My University" : "The Company"
      }
    },
    {
      question: `What's your ${student === "Yes" ? "Year/Grade" : "role at company"}?`,
      cb: setYear,
      status: year.trim() != "" ? true : false,
      optional: false,
      type: "input",
      value: year,
      options: {
        placeholder: student === "Yes" ? "Freshman" : "Software Engineer"
      }
    },
    {
      question: `Any notes for our team [Optional] ?`,
      cb: setNotes,
      status: notes.trim() != "" ? true : false,
      optional: true,
      type: "input",
      value: notes,
      options: {
        placeholder: "Notes for our team"
      }
    }

  ]

  const stepup = (step, cb) => {
    cb(step + 1);
  }
  const stepdown = (step, cb) => {
    cb(step - 1);
  }
  const displayquestion = (step) => {
    return questions[step].question;
  }

  const countStatusfunc = () => {
    let finalstatus = [];
    questions.forEach(i => {
      if (i.status || i.optional) {
        finalstatus.push(1);
      }
    })
    if (finalstatus.length === questions.length) {
      return true;
    }
    else {
      return false;
    }
  }

  const register = async (step) => {
    setErr([false, ""])
    setLoading(true);
    if (step === questions.length - 1 && countStatusfunc()) {
      setFreeze(true);
      const res = await submit(payload, setSuccess, setErr)
      if (res === 200) {

        setFreeze(true);
        setSuccess(true);
        setLoading(false);
      }
      else {
        setFreeze(false);
        setLoading(false);
      }
    } else {
      setFreeze(false);
      setLoading(false);
    }
  }
  const formatField = (question) => {
    const { type, value, options, cb } = question

    switch (type) {
      case 'input': return (<>
        <input disabled={success} onKeyDown={(e) => {
          if (e.keyCode === 13) {
            stepup(position, setPosition);
          }

        }} className=" w-10/12 p-4 mr-9"
          type="text"
          placeholder={options.placeholder}
          value={value}
          onChange={(e) => { cb(e.target.value) }} />
      </>);


      case 'select':
        const { defaultvalue } = question
        return (<>
          <select disabled={success} defaultValue={defaultvalue} value={value} onChange={(e) => { cb(e.target.value) }} className=" w-10/12 p-4 mr-9">
            <option value="">Select</option>
            {options.map(i => {
              return (<option key={i} value={i}>{i}</option>);
            })}
          </select>
        </>);

      default: return (<></>);
    }
  }

  return (
    <>

      <div className="mb-12 pb-6 text-xl pl-6 md:pl-12 pt-10 h-screen">
        <div className="text-4xl mt-12 ">✏ Registrations </div><br />
        <div className="mt-8">
          <div>
            {
              displayquestion(position).toLowerCase()
            }
            <br />
            <div className="w-full mt-5">
              {formatField(questions[position])}


            </div>


          </div>
          {!success && <> <button
            className="button mt-5 btn bg-blue-300"
            onClick={() => { position > 0 && stepdown(position, setPosition) }}
            disabled={success}
          >
            {"<"}
          </button>&nbsp;

            <button
              className="button mt-5 btn bg-blue-300"
              onClick={() => {
                position < questions.length - 1 ? stepup(position, setPosition) : register(position)

              }}
              disabled={freeze || success}

            >
              {position < questions.length - 1 ? "Next" : countStatusfunc() ? "Register" : "You missed something"}

            </button></>
          }
          <br />
          <br />
          <div
            className="py-4 mt-12"
            style={{
              transition: "all 1s ease"
            }}
          >
            {
              !success && questions.map((question, index) => {
                return (<>

                  <span style={{ cursor: "pointer", }}
                    className="text-base"
                    onClick={() => { setPosition(index) }}>
                    {question.optional ? (question.status ? 
                    <FontAwesomeIcon style={{ color: 'green', fontSize: "1.5rem" }} icon={faCheckCircle} /> :
                     <FontAwesomeIcon style={{ color: '#c2c2c2', fontSize: "1.5rem" }} icon={faCircle} />) :
                      question.status ? <FontAwesomeIcon style={{ color: 'green', fontSize: "1.5rem" }} icon={faCheckCircle} /> : 
                      (position > index ? <FontAwesomeIcon style={{ color: 'red', fontSize: "1.5rem" }} icon={faTimesCircle} /> : 
                      <FontAwesomeIcon style={{ color: '#1ba8f0', fontSize: "1.5rem" }} icon={faCircle} />)}
                  </span>

                </>)
              }
              )}</div>
          {errcb[0] &&

            <div className="text-base w-10/12 mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Oh no! </strong>
              <span className="block sm:inline">{errcb[1]}</span>
            </div>

          }
          {
            success &&
            <div className="text-base mt-10 w-10/12 bg-green-200 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div className="flex">
                <div>
                  <p className="font-bold">👋 {FullName.toLowerCase()}, you have successfully registered for api hacks 2.0</p>
                  <p className="text-sm">we will be reaching out on your mail shortly.<br />
                    find the announcements at <a href="https://discord.apihacks.co" style={{ color: "gray" }} target="_blank" rel="noopenner noreferrer"> discord</a> .</p>
                </div>
              </div>
            </div>


          }
        </div>
      </div>
    </>
  )
}

export default Registration
