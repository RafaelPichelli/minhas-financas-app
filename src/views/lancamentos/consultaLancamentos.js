import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import useLancamentoService from "../../app/service/useLancamentoService";
import useLocalStorage from "../../app/service/useLocalStorage";
import * as messages from '../../components/toastr'
import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'

function ConsultaLancamentos() {
    const navigate = useNavigate();
    const lancamentoService = useLancamentoService();
    const {obterItem} = useLocalStorage();
    
    const meses = lancamentoService.obterListaMeses();
    const tipos = lancamentoService.obterListaTipos();

    const [ano,setAno] = useState('');
    const [mes,setMes] = useState('');
    const [tipo,setTipo] = useState('');
    const [lancamentos, setLancamentos] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [showConfirmDialog,setShowConfirmDialog] = useState(false);
    const [lancamentoDeletar, setLancamentoDeletar] = useState({});
    


    const buscar = () => {
        if(!ano){
            messages.mensagemErro('O campo ano é obrigátorio.')
            return false;
        }
        
        const usuarioLogado = obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: ano,
            mes: mes,
            tipo: tipo,
            descricao:descricao,
            usuario: usuarioLogado.id
        }

        lancamentoService
            .consultarLancamentos(lancamentoFiltro)
            .then(resposta => {
                setLancamentos(resposta.data)
            }).catch(error=> {
                console.log(error)
            })
    }   

    const editar = (id) => {
        console.log('Editar: ' + id)
    }

    const deletar = () => {
        lancamentoService
        .deletar(lancamentoDeletar.id).then(response => {
            const index = lancamentos.indexOf(lancamentoDeletar);
            lancamentos.splice(index, 1) 
            setLancamentos(lancamentos);
            setShowConfirmDialog(false);
            messages.mensagemSucesso('Lançamento deletado com sucesso!!!')
        }).catch(error => {
            messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento.')
        })
    }

    const abrirConfirmacao = (lancamento) => {
        setShowConfirmDialog(true);
        setLancamentoDeletar(lancamento);

    }

    const cancelarDelecao = () => {
        setShowConfirmDialog(false);
        setLancamentoDeletar({});
    }

    const confirmDialogFooter = (
        <div>
            <Button label="Confirma" icon="pi pi-check" onClick={deletar}/>
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDelecao} className="p-button-secondary"/>
        </div>
    )

    return (
        <Card title="Consulta Lançamentos">
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                className="form-control"
                                id="inputAno"
                                value={ano}
                                onChange={e => setAno(e.target.value)}
                                placeholder="Digite o Ano" />
                        </FormGroup>

                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectMenu id="inputMes" 
                            className="form-control" 
                            value={mes}
                            onChange={e => setMes(e.target.value)}
                            lista={meses} />
                        </FormGroup>

                        <FormGroup htmlFor="inputDesc" label="Descrição: ">
                            <input type="text"
                                className="form-control"
                                id="inputDesc"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                placeholder="Digite a descrição" />
                        </FormGroup>

                        <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">
                            <SelectMenu id="inputTipo" 
                            className="form-control" 
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            lista={tipos} />
                        </FormGroup>

                        <button type="button" className="btn btn-success" onClick={buscar}>Buscar</button>
                        <button type="button" className="btn btn-danger">Cadastrar</button>

                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">

                        <LancamentosTable 
                        lancamentos={lancamentos}
                        deleteAction={abrirConfirmacao}
                        editAction={editar}/>

                        </div>
                    </div>

                </div>
            <div>
                <Dialog header="Confirmação"
                    visible={showConfirmDialog}
                    style={{width: '50vw'}}
                    modal={true}
                    onHide={() => setShowConfirmDialog(false)}
                    footer={confirmDialogFooter}>Certeza que deseja excluir esse lançamento?</Dialog>

            </div>
            </div>
        </Card>
    )

}

export default ConsultaLancamentos;