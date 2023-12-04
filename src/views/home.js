import React, { useEffect, useState, useContext } from "react";
import useUsuarioService from "../app/service/useUsuarioService";
import { AuthContext } from "../main/provedorAutenticacao";

function Home() {
    const usuarioService = useUsuarioService();
    const { usuarioAutenticado } = useContext(AuthContext);

    const [saldo, setSaldo] = useState(0)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obterSaldo = async () => {
            try {
                if (usuarioAutenticado && usuarioAutenticado.id) {
                    const response = await usuarioService.obterSaldoUsuario(usuarioAutenticado.id);
                    setSaldo(response.data);
                } else {
                    console.error("Usuário não autenticado ou sem ID.");
                }
            } catch (error) {
                console.error(error.response);
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            obterSaldo();
        }
    }, [usuarioService, usuarioAutenticado, loading]);

    if (loading) {
        return <div>Carregando...</div>;
    } else {
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
                        <i className="pi pi-users"></i>
                        Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg"
                        href="#/cadastro-lancamentos"
                        role="button">
                        <i className="pi pi-money-bill"></i>
                        Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

export default Home;