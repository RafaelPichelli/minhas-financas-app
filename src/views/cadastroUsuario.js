import React, { useState } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { useNavigate } from "react-router-dom";
import useUsuarioService from "../app/service/useUsuarioService";
import { mensagemErro, mensagemSucesso } from "../components/toastr";

function CadastroUsuario() {
    const navigate = useNavigate();
    const usuarioService = useUsuarioService();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepeticao, setSenhaRepeticao] = useState('');

    const cadastrar = () => {
        const usuario = {
            nome,
            email,
            senha,
            senhaRepeticao
        };

        try {
            usuarioService.validar(usuario)
        } catch (error) {
            error.mensagens.forEach(msg => mensagemErro(msg));
            return false
        }

        usuarioService.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Logue para acessar o sistema.')
                navigate('/login');
            }).catch(error => {
                mensagemErro(error.response.data);
            })
    }

    const cancelar = () => {
        navigate('/login');
    }

    return (
        <Card title="Cadastro de Usuário">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <fieldset>
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="inputNome"
                                    name="nome"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input
                                    className="form-control"
                                    type="email"
                                    id="inputEmail"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input
                                    className="form-control"
                                    type="password"
                                    id="inputSenha"
                                    name="senha"
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input
                                    className="form-control"
                                    type="password"
                                    id="inputRepitaSenha"
                                    name="senha"
                                    value={senhaRepeticao}
                                    onChange={e => setSenhaRepeticao(e.target.value)}
                                />
                            </FormGroup>
                            <button onClick={cadastrar} type="button" className="btn btn-success">
                            <i className="pi pi-save"/> Salvar
                            </button>
                            <button onClick= {cancelar} type="button" className="btn btn-danger">
                            <i className="pi pi-times"/> Cancelar
                            </button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CadastroUsuario;
