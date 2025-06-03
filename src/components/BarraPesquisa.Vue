<template>
  <div class="relative">
    <input
      type="text"
      v-model="termoPesquisa"
      @input="pesquisar"
      placeholder="Pesquisar produtos..."
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button 
      v-if="termoPesquisa" 
      @click="limparPesquisa"
      class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
    >
      ✕
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const termoPesquisa = ref('')

const pesquisar = () => {
  if (termoPesquisa.value.trim()) {
    router.push({ path: '/pesquisa', query: { q: termoPesquisa.value } })
  }
}

const limparPesquisa = () => {
  termoPesquisa.value = ''
  router.push('/')
}
</script>