import axios from "axios"
import './Signup.css'

const Signup = (props) => {

    async function handleSubmit(e) {

        e.preventDefault()

        console.log(e.target.elements.nome.value)

        const formData = new FormData()

        formData.append('nome', e.target.elements.nome.value);
        formData.append('sobrenome', e.target.elements.sobrenome.value);
        formData.append('email', e.target.elements.email.value);
        formData.append('senha', e.target.elements.senha.value);

        try {
            const res = await axios.post('http://localhost:5000/api/v1/cadastrar_usuario/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            console.log(res)
            if(res.status === 200)
                props.setDisplay(true)
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
                            name="senha"
                            placeholder="senha"
                            id="senha"
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