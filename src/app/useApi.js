import axios from 'axios';

const useApi = () => {
  const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
  });

  const get = (url) => httpClient.get(url);
  const post = (url, data) => httpClient.post(url, data);
  const put = (url, data) => httpClient.put(url, data);
  const remove = (url) => httpClient.delete(url);

  return { get, post, put, remove };
};

export default useApi;