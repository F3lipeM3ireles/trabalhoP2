<template>
  <div class="bg-gray-50 p-4 rounded-lg">
    <h2 class="text-xl font-bold mb-4">Categorias</h2>
    <ul>
      <li 
        v-for="categoria in categorias" 
        :key="categoria" 
        class="mb-2"
      >
        <router-link 
          :to="`/categoria/${categoria}`" 
          class="block px-3 py-2 rounded hover:bg-gray-200 transition-colors"
          :class="{'bg-blue-100 text-blue-800': $route.params.categoria === categoria}"
        >
          {{ categoria }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const categorias = ref([])

onMounted(async () => {
  try {
    const response = await api.getCategorias()
    categorias.value = response.data
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
  }
})
</script>