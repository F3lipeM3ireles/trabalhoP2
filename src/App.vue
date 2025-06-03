<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold text-blue-600">E-Commerce</router-link>
        
        <div class="flex items-center space-x-6">
          <BarraPesquisa />
          <IconeCarrinho />
        </div>
      </div>
    </header>
    
    <main>
      <router-view />
    </main>
    
    <CarrinhoLateral />
  </div>
</template>

<script setup>
import BarraPesquisa from './components/BarraPesquisa.vue'
import IconeCarrinho from './components/IconeCarrinho.vue'
import CarrinhoLateral from './components/CarrinhoLateral.vue'
</script>