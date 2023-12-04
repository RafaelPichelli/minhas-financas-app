import useApi from '../useApi';
import ErroValidacao from '../exception/erroValidacao';

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

  const validar = (usuario) => {
    const erros = [];

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório.');
        };

        if(!usuario.email){
            erros.push('O campo Email é obrigatório.');
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um Email válido.');
        };

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x.');
        }else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push("As senhas estão diferentes.")
        };

        if(erros && erros.length > 0){
          throw new ErroValidacao(erros);
        }
  }

  return {
    autenticar,
    obterSaldoUsuario,
    salvar,
    validar
  };
};

export default useUsuarioService;
