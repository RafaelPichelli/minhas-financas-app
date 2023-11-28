const useLocalStorage = () => {

  const adicionarItem = (chave, valor) => {
    localStorage.setItem(chave, JSON.stringify(valor));
  };

  const obterItem = (chave) => {
    return JSON.parse(localStorage.getItem(chave));
  };

  return { adicionarItem, obterItem };
};

export default useLocalStorage;
