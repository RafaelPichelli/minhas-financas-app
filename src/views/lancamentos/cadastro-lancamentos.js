import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

function CadastroLancamentos (){



    return(
        <Card>
            <div className="row">
                <FormGroup id="inputDescricao" label="Descrição: *">
                    <input id="inputDescricao" type="text" className="form-control"/>
                </FormGroup>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                        <input id="inputAno" type="text" className="form-control"/>
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mês: *">
                        <input id="inputMes" type="text" className="form-control"/>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor: *">
                        <input id="inputValor" type="text" className="form-control"/>
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu></SelectMenu>
                    </FormGroup>
                </div>
            </div>

        </Card>
    )
}

export default CadastroLancamentos;