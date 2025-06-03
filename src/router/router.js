import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import PaginaInicial from './views/PaginaInicial.vue'
import DetalhesProduto from './views/DetalhesProduto.vue'
import VisualizacaoCategoria from './views/VisualizacaoCategoria.vue'
import './assets/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PaginaInicial },
    { path: '/produto/:id', component: DetalhesProduto },
    { path: '/categoria/:categoria', component: VisualizacaoCategoria },
    { 
      path: '/pesquisa', 
      component: PaginaInicial,
      props: (route) => ({ termoPesquisa: route.query.q })
    },
  ]
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')