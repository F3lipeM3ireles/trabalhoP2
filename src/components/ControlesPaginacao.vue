<template>
  <div class="flex justify-center mt-8">
    <nav class="inline-flex rounded-md shadow">
      <button
        @click="irParaPagina(paginaAtual - 1)"
        :disabled="paginaAtual === 1"
        class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        :class="{'opacity-50 cursor-not-allowed': paginaAtual === 1}"
      >
        Anterior
      </button>
      
      <template v-for="pagina in paginasVisiveis" :key="pagina">
        <button
          @click="irParaPagina(pagina)"
          class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium"
          :class="{
            'text-blue-600 bg-blue-50': pagina === paginaAtual,
            'text-gray-700 hover:bg-gray-50': pagina !== paginaAtual
          }"
        >
          {{ pagina }}
        </button>
      </template>
      
      <button
        @click="irParaPagina(paginaAtual + 1)"
        :disabled="paginaAtual === totalPaginas"
        class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        :class="{'opacity-50 cursor-not-allowed': paginaAtual === totalPaginas}"
      >
        Próxima
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  paginaAtual: {
    type: Number,
    required: true
  },
  totalPaginas: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['mudar-pagina'])

const paginasVisiveis = computed(() => {
  const paginas = []
  const maxVisivel = 5
  let inicio = 1
  let fim = props.totalPaginas
  
  if (props.totalPaginas > maxVisivel) {
    inicio = Math.max(1, props.paginaAtual - Math.floor(maxVisivel / 2))
    fim = Math.min(props.totalPaginas, inicio + maxVisivel - 1)
    
    if (fim - inicio + 1 < maxVisivel) {
      inicio = fim - maxVisivel + 1
    }
  }
  
  for (let i = inicio; i <= fim; i++) {
    paginas.push(i)
  }
  
  return paginas
})

const irParaPagina = (pagina) => {
  if (pagina >= 1 && pagina <= props.totalPaginas) {
    emit('mudar-pagina', pagina)
  }
}
</script>