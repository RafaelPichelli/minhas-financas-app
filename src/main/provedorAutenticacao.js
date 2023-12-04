import React, { useState } from "react";
import useAuthService from "../app/service/useAuthService";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

const ProvedorAutenticacao = (props) => {
    const { logar, removerUsuarioAutenticado } = useAuthService();
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
    const [isAutenticado, setIsAutenticado] = useState(false);

    const iniciarSessao = (usuario) => {
        logar(usuario);
        setUsuarioAutenticado(usuario);
        setIsAutenticado(true);
    };

    const encerrarSessao = () => {
        removerUsuarioAutenticado();
        setUsuarioAutenticado(null);
        setIsAutenticado(false);
    };

    const contexto = {
        isAutenticado,
        usuarioAutenticado,
        iniciarSessao,
        encerrarSessao,
    };

    return (
        <AuthProvider value={contexto}>
            {props.children}
        </AuthProvider>
    );
};

export default ProvedorAutenticacao;
