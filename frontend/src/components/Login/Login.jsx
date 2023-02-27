import React, { useState } from "react"
import Signup from "./Signup/Signup"
import Signin from "./Signin/Signin"


export default function Login(props) {
    
    const [session,setSession] = useState(false)

    return (
        session ? <Signup setSession={setSession}/> : <Signin setSession={setSession} setDisplay={props.setDisplay}/>
    )
}