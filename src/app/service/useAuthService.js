import useLocalStorage from "./useLocalStorage";

const USUARIO_LOGADO = '_usuario_logado'
    

const useAuthService = () => {
    const {obterItem, removerItem, adicionarItem} = useLocalStorage();
    
    const isUsuarioAutenticado = () => {
        const usuarioLogado = getUsuarioAutenticado();
        if(usuarioLogado && usuarioLogado.id){
            return true;
        }else{
            return false;
        }
         
    }

    const removerUsuarioAutenticado = () =>{
        removerItem(USUARIO_LOGADO);
    }

    const logar = (usuario) =>{
        adicionarItem(USUARIO_LOGADO, usuario);
    }

    const getUsuarioAutenticado = () => {
        const usuario = obterItem(USUARIO_LOGADO);
        return usuario;
    }

    return{
        removerUsuarioAutenticado,
        logar,
        isUsuarioAutenticado,
        getUsuarioAutenticado
    }

}

export default useAuthService;
