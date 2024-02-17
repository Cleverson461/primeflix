import axios from "axios";
// Base da URL: https://api.themoviedb.org/3/
// 28f585661ee77c9dc2295b092f5cb9db
// URL DA API: movie/now_playing?api_key=28f585661ee77c9dc2295b092f5cb9db&language=pt-BR

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;