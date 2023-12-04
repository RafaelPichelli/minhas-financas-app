import useApi from '../useApi';
import ErroValidacao from '../exception/erroValidacao';

const useLancamentoService = () => {
    const api = useApi();
    const baseEndPoint = '/api/lancamentos';

    const obterListaTipos = () => {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ]
    }

    const obterListaMeses = () => {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 }
        ]
    }

    const consultarLancamentos = (lancamentoFiltro) => {
        const params = [
            `${baseEndPoint}?ano=${lancamentoFiltro.ano}`,
            lancamentoFiltro.mes && `mes=${lancamentoFiltro.mes}`,
            lancamentoFiltro.tipo && `tipo=${lancamentoFiltro.tipo}`,
            lancamentoFiltro.status && `status=${lancamentoFiltro.status}`,
            lancamentoFiltro.usuario && `usuario=${lancamentoFiltro.usuario}`,
            lancamentoFiltro.descricao && `descricao=${lancamentoFiltro.descricao}`,
        ].filter(Boolean).join('&');

        return api.get(params);
    }

    const obterPorId = (id) => {
        return api.get(`${baseEndPoint}/${id}`)
    }

    const  deletar = (id) => {
        return api.remove(`${baseEndPoint}/${id}`);
    }

    const salvar = (lancamento) => {
        return api.post(baseEndPoint, lancamento);
    }

    const atualizar = (lancamento) => {
        return api.put(`${baseEndPoint}/${lancamento.id}`, lancamento)
    }

    const validar = (lancamento) => {
        const erros = [];

        if(!lancamento.ano){
            erros.push("Informe o ano.")
        }
        if(!lancamento.mes){
            erros.push("Informe o mês.")
       }
       if(!lancamento.descricao){
        erros.push("Informe o descrição.")
        }
        if(!lancamento.valor){
            erros.push("Informe o valor.")
        }
        if(!lancamento.tipo){
            erros.push("Informe o tipo.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    const alterarStatus = (id, status) => {
        return api.put(`${baseEndPoint}/${id}/atualiza-status`, {status})
    }

    return {
        consultarLancamentos,
        obterPorId,
        obterListaMeses,
        obterListaTipos,
        deletar,
        salvar,
        atualizar,
        validar,
        alterarStatus
    };
};

export default useLancamentoService;
