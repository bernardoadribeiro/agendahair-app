import axios from "axios"
import { useState } from "react"
import './Signin.css'
// Componente para Entrar no Sistema

const Signin = (props) => {

    async function handleSubmit(e) {

        e.preventDefault()

        let data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        try {
            const res = await axios.post('http://localhost:5000/login', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
            if (res.data.id)
                console.log(res)
            else{
                console.log('não')
            }
        } catch (e) {
            console.log(e)
            props.setDisplay(true)
        }
    }

    return (
        <>
            <div id="outer">
                <div id="inner">
                    <h1>Entrar no Sistema</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            id="email"
                            required
                        />
                        <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="senha"
                            id="password"
                            required
                        />
                        <button type="submit">Entrar</button>
                        <p onClick={() => props.setSession(true)}>criar conta</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin