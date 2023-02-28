import axios from "axios"
import './Signup.css'

const Signup = (props) => {

    async function handleSubmit(e) {

        e.preventDefault()

        const data = new FormData(e.target.form)

        try {
            fetch('http://localhost:5000/api/v1/cadastrar_usuario/', {
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'application/json'}
            })
            .then((res)=> {
                console.log(res)
                if(res.status === 200)
                    props.setDisplay(true)
            })
        } catch (e) {
            document.getElementById('errorCatcher').innerText = "Erro no cadastro, tente novamente!"
        }
    }

    return (
        <>
            <div id="outer">
                <div id="inner">
                    <h1>Criar conta</h1>
                    <form onSubmit={handleSubmit}>
                    <input
                            type="text"
                            name="nome"
                            placeholder="nome"
                            id="nome"
                            required
                        />
                        <br />
                        <input
                            type="text"
                            name="sobrenome"
                            placeholder="sobrenome"
                            id="sobrenome"
                            required
                        />
                        <br />
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
                        <button type="submit">Criar</button>
                    </form>
                    <p onClick={() => props.setSession(false)}>Fazer Login</p>
                    <p id="errorCatcher"></p>
                </div>
            </div>
        </>
    )
}

export default Signup