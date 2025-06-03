import { defineStore } from 'pinia'

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    itens: [],
    aberto: false,
  }),
  actions: {
    adicionarItem(produto) {
      const itemExistente = this.itens.find(item => item.id === produto.id)
      if (itemExistente) {
        itemExistente.quantidade++
      } else {
        this.itens.push({ ...produto, quantidade: 1 })
      }
    },
    removerItem(id) {
      this.itens = this.itens.filter(item => item.id !== id)
    },
    atualizarQuantidade(id, quantidade) {
      const item = this.itens.find(item => item.id === id)
      if (item) {
        item.quantidade = quantidade
      }
    },
    limparCarrinho() {
      this.itens = []
    },
    alternarCarrinho() {
      this.aberto = !this.aberto
    },
  },
  getters: {
    totalItens: (state) => state.itens.reduce((total, item) => total + item.quantidade, 0),
    precoTotal: (state) => state.itens.reduce((total, item) => total + (item.price * item.quantidade), 0),
  },
})