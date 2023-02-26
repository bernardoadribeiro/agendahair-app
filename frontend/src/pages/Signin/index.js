import React from "react";
import axios from "axios"

// Componente para fazer Login

const Signin = () => {

    function handleSubmit(e) {
        
        e.preventDefault()

        const signed = false

        const data = new FormData()
        data.append("email", e.target.email.value)
        data.append("password", e.target.password.value)

        // Operação POST para o backEnd, tratar os dados e verificar a sessão. 
        axios.post('localhost:5000/check-auth/', data, {headers: {'Content-Type': 'Multipart/form-data'}})
        .then((res) => {

         })
    }

    return (
        <div>
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

                <button onSubmit={handleSubmit}>Entrar</button>

            </form>
        </div>
    )
}

export default Signin