import useApi from '../useApi';

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
        let params = `${baseEndPoint}?ano=${lancamentoFiltro.ano}`
    
        if(lancamentoFiltro.mes){
            params=`${params}&mes=${lancamentoFiltro.mes}`
        }
        if(lancamentoFiltro.tipo){
            params=`${params}&tipo=${lancamentoFiltro.tipo}`
        }
        if(lancamentoFiltro.status){
            params=`${params}&status=${lancamentoFiltro.status}`
        }
        if(lancamentoFiltro.usuario){
            params=`${params}&usuario=${lancamentoFiltro.usuario}`
        }
        if(lancamentoFiltro.descricao){
            params=`${params}&descricao=${lancamentoFiltro.descricao}`
        }


        return api.get(params);
    }

    const  deletar = (id) => {
        return api.remove(`${baseEndPoint}/${id}`);
    }

    return {
        consultarLancamentos,
        obterListaMeses,
        obterListaTipos,
        deletar
    };
};

export default useLancamentoService;
