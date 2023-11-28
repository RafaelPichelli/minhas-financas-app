import React, { useEffect, useState } from "react";
import useUsuarioService from "../app/service/useUsuarioService";
import useLocalStorage from "../app/service/useLocalStorage";

function Home() {
    const usuarioService = useUsuarioService();

    const {obterItem} = useLocalStorage();

    const [saldo,setSaldo] = useState(0)

    useEffect(() => {
        const usuarioLogado = obterItem('_usuario_logado');

        usuarioService.obterSaldoUsuario(usuarioLogado.id)
            .then(response => {
                setSaldo(response.data)
            }).catch(error =>{
                console.error(error.response)
            });
    },[usuarioService, obterItem]);

    return (
        <div className="jumbotron">
            <h1 className="display-3">Bem vindo!</h1>
            <p className="lead">Esse é seu sistema de finanças.</p>
            <p className="lead">Seu saldo para o mês atual é de R$ {saldo}</p>
            <hr className="my-4" />
            <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg"
                    href="#/cadastro-usuarios"
                    role="button">
                    <i className="fa fa-users"></i>
                    Cadastrar Usuário
                </a>
                <a className="btn btn-danger btn-lg"
                    href="https://bootswatch.com/flatly/#"
                    role="button">
                    <i className="fa fa-users"></i>
                    Cadastrar Lançamento
                </a>
            </p>
        </div>
    )
}

export default Home;