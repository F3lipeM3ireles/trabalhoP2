<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <router-link :to="`/produto/${produto.id}`">
      <img 
        :src="produto.thumbnail" 
        :alt="produto.title" 
        class="w-full h-48 object-cover"
      />
    </router-link>
    <div class="p-4">
      <router-link :to="`/produto/${produto.id}`" class="block">
        <h3 class="text-lg font-semibold mb-2">{{ produto.title }}</h3>
      </router-link>
      <div class="flex justify-between items-center">
        <span class="text-gray-800 font-bold">R${{ produto.price }}</span>
        <span 
          class="text-sm px-2 py-1 rounded-full" 
          :class="produto.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
        >
          {{ produto.stock > 0 ? 'Em Estoque' : 'Sem Estoque' }}
        </span>
      </div>
      <button 
        @click="adicionarAoCarrinho" 
        class="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        :disabled="produto.stock <= 0"
        :class="produto.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCarrinhoStore } from '../stores/carrinho'

const props = defineProps({
  produto: {
    type: Object,
    required: true
  }
})

const carrinhoStore = useCarrinhoStore()

const adicionarAoCarrinho = () => {
  carrinhoStore.adicionarItem(props.produto)
}
</script>