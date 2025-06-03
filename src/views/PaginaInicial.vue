<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-1/4">
        <BarraLateralCategorias />
      </div>
      
      <div class="md:w-3/4">
        <div class="mb-6">
          <BarraPesquisa />
        </div>
        
        <div class="mb-6 flex justify-between items-center">
          <h1 class="text-2xl font-bold">Todos os Produtos</h1>
          <div class="flex items-center space-x-4">
            <select 
              v-model="ordenacao"
              class="border rounded-md px-3 py-2 text-sm"
            >
              <option value="padrao">Padrão</option>
              <option value="preco-asc">Preço: Menor para Maior</option>
              <option value="preco-desc">Preço: Maior para Menor</option>
              <option value="nome-asc">Nome: A-Z</option>
              <option value="nome-desc">Nome: Z-A</option>
            </select>
          </div>
        </div>
        
        <GradeProdutos 
          :produtos="produtosOrdenados"
          :carregando="carregando"
          :pagina-atual="paginaAtual"
          :total-paginas="totalPaginas"
          @mudar-pagina="mudarPagina"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'
import GradeProdutos from '../components/GradeProdutos.vue'
import BarraLateralCategorias from '../components/BarraLateralCategorias.vue'
import BarraPesquisa from '../components/BarraPesquisa.vue'

const route = useRoute()
const router = useRouter()

const produtos = ref([])
const carregando = ref(false)
const paginaAtual = ref(1)
const totalPaginas = ref(1)
const ordenacao = ref('padrao')
const limite = 12

const produtosOrdenados = computed(() => {
  const itens = [...produtos.value]
  
  switch (ordenacao.value) {
    case 'preco-asc':
      return itens.sort((a, b) => a.price - b.price)
    case 'preco-desc':
      return itens.sort((a, b) => b.price - a.price)
    case 'nome-asc':
      return itens.sort((a, b) => a.title.localeCompare(b.title))
    case 'nome-desc':
      return itens.sort((a, b) => b.title.localeCompare(a.title))
    default:
      return itens
  }
})

const buscarProdutos = async () => {
  try {
    carregando.value = true
    const response = await api.getProdutos(paginaAtual.value, limite)
    produtos.value = response.data.products
    totalPaginas.value = Math.ceil(response.data.total / limite)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  } finally {
    carregando.value = false
  }
}

const mudarPagina = (pagina) => {
  paginaAtual.value = pagina
  router.push({ query: { ...route.query, page: pagina } })
}

watch(() => route.query.page, (novaPagina) => {
  if (novaPagina) {
    paginaAtual.value = parseInt(novaPagina) || 1
    buscarProdutos()
  }
}, { immediate: true })

watch(ordenacao, () => {
  // Apenas dispara a propriedade computada
})
</script>