import React from "react";
import { Route, HashRouter, Routes } from 'react-router-dom';
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";

function Rotas(){
    return(
        <HashRouter>
            <Routes>
                <Route path="/home" Component={Home}/>
                <Route path="/login" Component={Login} />
                <Route path="/cadastro-usuarios" Component={CadastroUsuario} />
                <Route path="/consulta-lancamentos" Component={ConsultaLancamentos} />
                <Route path="/cadastro-lancamentos" Component={CadastroLancamentos} />
            </Routes>
        </HashRouter>
    )
}

export default Rotas;