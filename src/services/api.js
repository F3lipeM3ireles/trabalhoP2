import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com/products',
})

export default {
  getProdutos(pagina = 1, limite = 12) {
    return api.get(`?limit=${limite}&skip=${(pagina - 1) * limite}`)
  },
  getProduto(id) {
    return api.get(`/${id}`)
  },
  getCategorias() {
    return api.get('/categories')
  },
  getProdutosPorCategoria(categoria) {
    return api.get(`/category/${categoria}`)
  },
  pesquisarProdutos(termo) {
    return api.get(`/search?q=${termo}`)
  },
}