<script setup>
import { livros } from '@/_data/livros.js'
import { ref } from 'vue'

function incrementar(livro) {
  livro.value.quantidade++
}

function decrementar(livro) {
  if (livro.value.quantidade <= 0) {
    alert('Os itens ja foram retirados')
  } else livro.value.quantidade--
}

const darkTheme = ref(false)

function trocarTheme() {
  darkTheme.value = !darkTheme.value
}
</script>

<template>
  <div class="bg-base min-g-screen" :class="[darkTheme ? 'frappe' : 'latte']">
  <header class="sticky top-0 bg-black shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <div>
      <button
        class="bg-white-500 hover:bg-red-500 text-white font-bold py-0 px-4 rounded-full"
     @click="trocarTheme()"
      >
        Dark Mode
      </button>
    </div>
      <div class="flex items-center gap-3 flex-1"></div>
    </nav>
  </header>

  <div class="grid gap-4 grid-cols-3">
    <div class="m-5 rounded overflow-hidden shadow-lg" v-for="livro in livros" :key="livro.id">
      <p>Titulo: {{ livro.titulo }}</p>
      <p>Autor: {{ livro.autor }}</p>
      <p>Preço: R$:{{ livro.preco }}</p>
      <p>Quantidade: {{ livro.quantidade }}</p>
      <div>
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-800 text-black font-bold py-2 px-4 rounded-full"
            @click="incrementar(ref(livro))"
          >
            Incrementar
          </button>
        </div>
      </div>
      <button
        class="bg-red-500 hover:bg-red-800 text-black font-bold py-2 px-4 rounded-full"
        @click="decrementar(ref(livro))"
      >
        Decrementar
      </button>
    </div>
  </div>
</div>
</template>
