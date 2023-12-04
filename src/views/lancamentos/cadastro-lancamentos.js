import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import useLancamentoService from "../../app/service/useLancamentoService"
import * as messages from '../../components/toastr';
import useLocalStorage from '../../app/service/useLocalStorage'

function CadastroLancamentos() {
    const navigate = useNavigate();
    const lancamentoService = useLancamentoService();
    const { obterItem } = useLocalStorage();
    const { id } = useParams();

    const tipos = lancamentoService.obterListaTipos();
    const meses = lancamentoService.obterListaMeses();

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [atualizando, setAtualizando] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (id) {
            lancamentoService.obterPorId(id)
                .then(response => {
                    const { descricao, valor, mes, ano, tipo, status, usuario } = response.data;
                    setDescricao(descricao);
                    setValor(valor);
                    setMes(mes);
                    setAno(ano);
                    setTipo(tipo);
                    setStatus(status);
                    setUsuario(usuario);
                    setAtualizando(true);
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
            setLoading(false);
        }
    }, [id, lancamentoService])

    const submit = () => {
        const usuarioLogado = obterItem('_usuario_logado');

        const lancamento = {
            descricao,
            valor,
            mes,
            ano,
            tipo,
            usuario: usuarioLogado.id
        };

        try {
            lancamentoService.validar(lancamento);
        } catch (error) {
            const mensagens = error.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        lancamentoService
            .salvar(lancamento).then(response => {
                navigate('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            });

    }

    const atualizar = () => {

        const lancamento = {
            id,
            descricao,
            valor,
            mes,
            ano,
            tipo,
            status,
            usuario
        };

        lancamentoService
            .atualizar(lancamento).then(response => {
                navigate('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            });
    }

    if (loading) {
        return <div>Carregando...</div>;
    } else {
        return (
            <Card title={atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamento"}>
                <div className="row">
                    <FormGroup id="inputDescricao" label="Descrição: *">
                        <input id="inputDescricao"
                            type="text"
                            className="form-control"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno"
                                type="text"
                                className="form-control"
                                value={ano}
                                onChange={e => setAno(e.target.value)} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes"
                                lista={meses}
                                className="form-control"
                                value={mes}
                                onChange={e => setMes(e.target.value)} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                                type="text"
                                className="form-control"
                                value={valor}
                                onChange={e => setValor(e.target.value)} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo"
                                lista={tipos}
                                className="form-control"
                                value={tipo}
                                onChange={e => setTipo(e.target.value)} />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input type="text"
                                className="form-control"
                                value={status}
                                disabled />

                        </FormGroup>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        {atualizando ? (
                            <button className="btn btn-success" onClick={atualizar}>
                                <i className="pi pi-refresh" /> Atualizar</button>
                        ) : (
                            <button className="btn btn-success" onClick={submit}>
                                <i className="pi pi-save" /> Salvar</button>
                        )
                        }
                        <button className="btn btn-danger" onClick={() => navigate('/consulta-lancamentos')}>
                            <i className="pi pi-times" /> Cancelar</button>
                    </div>
                </div>

            </Card>
        )
    }
}

export default CadastroLancamentos;