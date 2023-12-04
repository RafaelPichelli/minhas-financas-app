import React from "react";
import { Route, HashRouter, Routes, Navigate } from 'react-router-dom';

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import { AuthConsumer } from "./provedorAutenticacao";

function Rotas() {

    return (
        <AuthConsumer>
            {(context) => (
                <HashRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />

                        <Route path="/home" element={context.isAutenticado ? <Home /> : <Navigate to="/login"/>} />
                        <Route path="/consulta-lancamentos" element={context.isAutenticado ? <ConsultaLancamentos /> : <Navigate to="/login"/>} />
                        <Route path="/cadastro-lancamentos/:id?" element={context.isAutenticado ? <CadastroLancamentos /> : <Navigate to="/login"/>} />
                    </Routes>
                </HashRouter>
            )}
        </AuthConsumer>

    );
}

export default Rotas;
