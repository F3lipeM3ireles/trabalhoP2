<template>
  <div 
    v-if="aberto"
    class="fixed inset-0 overflow-hidden z-50"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div 
        @click="alternarCarrinho"
        class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>
      
      <div class="fixed inset-y-0 right-0 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full flex flex-col bg-white shadow-xl">
            <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900">Carrinho de Compras</h2>
                <button 
                  @click="alternarCarrinho"
                  class="ml-3 h-7 flex items-center"
                >
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div class="mt-8">
                <div v-if="itens.length === 0" class="text-center py-12">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">Seu carrinho está vazio</h3>
                  <p class="mt-1 text-sm text-gray-500">Comece adicionando alguns produtos</p>
                </div>
                
                <div v-else class="flow-root">
                  <ul class="-my-6 divide-y divide-gray-200">
                    <li v-for="item in itens" :key="item.id" class="py-6 flex">
                      <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <img 
                          :src="item.thumbnail" 
                          :alt="item.title"
                          class="w-full h-full object-center object-cover"
                        />
                      </div>
                      
                      <div class="ml-4 flex-1 flex flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>{{ item.title }}</h3>
                            <p class="ml-4">R${{ (item.price * item.quantidade).toFixed(2) }}</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">{{ item.category }}</p>
                        </div>
                        
                        <div class="flex-1 flex items-end justify-between text-sm">
                          <div class="flex items-center">
                            <button 
                              @click="atualizarQuantidade(item.id, item.quantidade - 1)"
                              :disabled="item.quantidade <= 1"
                              class="px-2 py-1 border rounded-l-md"
                              :class="{'opacity-50 cursor-not-allowed': item.quantidade <= 1}"
                            >
                              -
                            </button>
                            <span class="px-4 py-1 border-t border-b">{{ item.quantidade }}</span>
                            <button 
                              @click="atualizarQuantidade(item.id, item.quantidade + 1)"
                              class="px-2 py-1 border rounded-r-md"
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            @click="removerItem(item.id)"
                            type="button" 
                            class="font-medium text-red-600 hover:text-red-500"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div v-if="itens.length > 0" class="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>R${{ precoTotal.toFixed(2) }}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">Frete e impostos calculados no checkout.</p>
              <div class="mt-6">
                <button 
                  class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Finalizar Compra
                </button>
              </div>
              <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  ou 
                  <button 
                    @click="alternarCarrinho"
                    type="button" 
                    class="text-blue-600 font-medium hover:text-blue-500"
                  >
                    Continuar Comprando<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCarrinhoStore } from '../stores/carrinho'
import { storeToRefs } from 'pinia'

const carrinhoStore = useCarrinhoStore()
const { itens, aberto, precoTotal } = storeToRefs(carrinhoStore)
const { alternarCarrinho, removerItem, atualizarQuantidade } = carrinhoStore
</script>