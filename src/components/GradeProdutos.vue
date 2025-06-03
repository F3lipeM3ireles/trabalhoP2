<template>
  <div>
    <div v-if="carregando" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CartaoProduto 
          v-for="produto in produtos" 
          :key="produto.id" 
          :produto="produto" 
        />
      </div>
      
      <ControlesPaginacao 
        v-if="mostrarPaginacao"
        :pagina-atual="paginaAtual"
        :total-paginas="totalPaginas"
        @mudar-pagina="mudarPagina"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import CartaoProduto from './CartaoProduto.vue'
import ControlesPaginacao from './ControlesPaginacao.vue'

const props = defineProps({
  produtos: {
    type: Array,
    required: true
  },
  carregando: {
    type: Boolean,
    default: false
  },
  mostrarPaginacao: {
    type: Boolean,
    default: true
  },
  paginaAtual: {
    type: Number,
    default: 1
  },
  totalPaginas: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['mudar-pagina'])

const mudarPagina = (pagina) => {
  emit('mudar-pagina', pagina)
}
</script>