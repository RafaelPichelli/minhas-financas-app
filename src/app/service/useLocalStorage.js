const useLocalStorage = () => {

  const adicionarItem = (chave, valor) => {
    localStorage.setItem(chave, JSON.stringify(valor));
  };

  const obterItem = (chave) => {
    return JSON.parse(localStorage.getItem(chave));
  };

  const removerItem = (chave) => {
    localStorage.removeItem(chave);
  }

  return { adicionarItem, obterItem, removerItem };
};

export default useLocalStorage;