import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom';
import useUsuarioService from "../app/service/useUsuarioService";
import useLocalStorage from "../app/service/useLocalStorage";
import {mensagemErro} from '../components/toastr'

function Login() {
    const navigate = useNavigate();
    const usuarioService = useUsuarioService();
    
    const {adicionarItem} = useLocalStorage();

    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    
    const entrar = async () => {
        usuarioService.autenticar({
            email: email,
            senha: senha
        }).then(response => {
            adicionarItem('_usuario_logado', response.data)
            navigate('/home');
        }).catch (erro => {
            mensagemErro(erro.response.data)
        })
    }

    const prepareCadastrar = () => {
        navigate('/cadastro-usuarios');
    }

    return (
        <div className="row">
            <div className="col-md-6" style={{position : 'relative', left : '300px'}}>
            <div className="bs-docs-section">
                <Card title="Login">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <fieldset>
                                    <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                        <input type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Digite o Email"
                                        />
                                    </FormGroup>
                                    <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                        <input type="password"
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                        />
                                    </FormGroup>
                                    <button onClick={entrar} className="btn btn-success">Entrar</button>
                                    <button onClick={prepareCadastrar} className="btn btn-danger">Cadastrar</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            </div>
        </div>
    );
}

export default Login;
