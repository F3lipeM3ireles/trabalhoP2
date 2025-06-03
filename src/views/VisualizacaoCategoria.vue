<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-1/4">
        <BarraLateralCategorias />
      </div>
      
      <div class="md:w-3/4">
        <h1 class="text-2xl font-bold mb-6 capitalize">{{ categoria }}</h1>
        
        <GradeProdutos 
          :produtos="produtos"
          :carregando="carregando"
          :mostrar-paginacao="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'
import GradeProdutos from '../components/GradeProdutos.vue'
import BarraLateralCategorias from '../components/BarraLateralCategorias.vue'

const route = useRoute()
const produtos = ref([])
const carregando = ref(false)
const categoria = ref('')

const buscarProdutosPorCategoria = async () => {
  try {
    carregando.value = true
    categoria.value = route.params.categoria
    const response = await api.getProdutosPorCategoria(categoria.value)
    produtos.value = response.data.products
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error)
  } finally {
    carregando.value = false
  }
}

watch(() => route.params.categoria, () => {
  buscarProdutosPorCategoria()
})

onMounted(() => {
  buscarProdutosPorCategoria()
})
</script>