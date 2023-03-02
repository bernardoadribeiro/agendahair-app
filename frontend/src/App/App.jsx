import React, { useState } from "react"
import "./App.css"
import Login from '../components/Login/Login'
import Display from "../components/Display/Display"

function App() {

    const [display, setDisplay] = useState(false)
    
    return (display ? <Display /> : <Login setDisplay={setDisplay} />)


}

export default App