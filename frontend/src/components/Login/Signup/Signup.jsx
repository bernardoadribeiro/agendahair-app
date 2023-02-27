import axios from "axios"
import './Signup.css'

const Signup = (props) => {

    async function handleSubmit(e) {

        e.preventDefault()

        let data = {
            nome: e.target.nome.value,
            sobrenome: e.target.sobrenome.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        try {
            const res = await axios.post('http://localhost:5000/cadastrar_usuario/', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
            console.log(res)
            if (res.data.signed === true)
                //data.token = setToken(res)
                console.log(res)
            else{
                console.log('não')
            }
        } catch (e) {
            console.log(e)
            props.setSession(true)
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
                </div>
            </div>
        </>
    )
}

export default Signup