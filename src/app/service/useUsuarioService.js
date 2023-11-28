import useApi from '../useApi';

const useUsuarioService = () => {
  const api = useApi();
  const baseEndPoint = '/api/usuarios';

  const autenticar = (credenciais) => {
    return api.post(`${baseEndPoint}/autenticar`, credenciais);
  };

  const obterSaldoUsuario = (id) => {
    return api.get(`${baseEndPoint}/${id}/saldo`);
  };

  const salvar = (usuario) => {
    return api.post(baseEndPoint, usuario);
  }

  return {
    autenticar,
    obterSaldoUsuario,
    salvar
    
  };
};

export default useUsuarioService;
