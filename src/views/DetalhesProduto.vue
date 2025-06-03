<template>
  <div v-if="carregando" class="flex justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
  
  <div v-else-if="produto" class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-1/2">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            :src="produto.thumbnail" 
            :alt="produto.title" 
            class="w-full h-96 object-contain"
          />
          <div class="p-4 grid grid-cols-4 gap-2">
            <img 
              v-for="(imagem, index) in produto.images" 
              :key="index"
              :src="imagem" 
              :alt="`${produto.title} imagem ${index + 1}`"
              @click="imagemAtual = imagem"
              class="h-20 object-cover cursor-pointer border"
              :class="{'border-blue-500 border-2': imagemAtual === imagem}"
            />
          </div>
        </div>
      </div>
      
      <div class="md:w-1/2">
        <h1 class="text-3xl font-bold mb-2">{{ produto.title }}</h1>
        <div class="flex items-center mb-4">
          <span class="text-yellow-400 flex">
            <span v-for="i in 5" :key="i">
              <svg 
                v-if="i <= Math.round(produto.rating)" 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg 
                v-else 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </span>
          </span>
          <span class="text-gray-600 ml-2">{{ produto.rating }} ({{ produto.stock }} em estoque)</span>
        </div>
        
        <div class="mb-6">
          <span class="text-3xl font-bold text-gray-900">R${{ produto.price }}</span>
          <span 
            v-if="produto.discountPercentage"
            class="ml-2 text-sm text-gray-500 line-through"
          >
            R${{ (produto.price / (1 - produto.discountPercentage / 100)).toFixed(2) }}
          </span>
          <span 
            v-if="produto.discountPercentage"
            class="ml-2 text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full"
          >
            {{ produto.discountPercentage }}% OFF
          </span>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Descrição</h3>
          <p class="text-gray-700">{{ produto.description }}</p>
        </div>
        
        <div class="mb-6 grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-sm font-medium text-gray-500">Marca</h4>
            <p class="text-gray-900">{{ produto.brand }}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-500">Categoria</h4>
            <p class="text-gray-900 capitalize">{{ produto.category }}</p>
          </div>
        </div>
        
        <button 
          @click="adicionarAoCarrinho"
          class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          :disabled="produto.stock <= 0"
          :class="{'opacity-50 cursor-not-allowed': produto.stock <= 0}"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  </div>
  
  <div v-else class="container mx-auto px-4 py-12 text-center">
    <h2 class="text-2xl font-bold text-gray-900">Produto não encontrado</h2>
    <router-link 
      to="/" 
      class="mt-4 inline-block text-blue-600 hover:text-blue-800"
    >
      &larr; Voltar para os produtos
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'
import { useCarrinhoStore } from '../stores/carrinho'

const route = useRoute()
const carrinhoStore = useCarrinhoStore()

const produto = ref(null)
const carregando = ref(false)
const imagemAtual = ref('')

const buscarProduto = async () => {
  try {
    carregando.value = true
    const response = await api.getProduto(route.params.id)
    produto.value = response.data
    imagemAtual.value = produto.value.thumbnail
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
  } finally {
    carregando.value = false
  }
}

const adicionarAoCarrinho = () => {
  if (produto.value) {
    carrinhoStore.adicionarItem(produto.value)
  }
}

onMounted(() => {
  buscarProduto()
})
</script>