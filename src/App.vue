<script setup>
import { livros } from '@/_data/livros.js'
import { ref } from 'vue'
import { carrinho } from '@/_data/carrinho.js'

function incrementar(livro) {
  livro.value.quantidade++
}

function decrementar(livro) {
  if (livro.value.quantidade <= 0) {
    alert('Os itens ja foram retirados')
  } else livro.value.quantidade--
}

function adicionarLivro(livro) {
  let livroCarrinho = carrinho.value.find((produto) => produto.id == livro.id)
  if (livro.quantidade == 0) {
    return alert("O item precisa ter uma quantidade minima de '1' para ser colocado no carrinho.")
  } else if (livroCarrinho) {
    livroCarrinho.quantidade += 1
  } else {
    carrinho.value.push(livro)
    carrinho.value.livro.quantidade++
  }
}

const mostrarCarrinho = ref(false)
</script>

<template>
  <div class="bg-base min-h-screen">
    <header class="sticky top-0 bg-black shadow-lg">
      <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
        <div>
          <button class="bg-white-500 hover:bg-red-500 text-white font-bold py-0 px-4 rounded-full">
            Dark Mode
          </button>
        </div>
        <div class="flex items-center gap-3 flex-1">
          <button
            @click="mostrarCarrinho = !mostrarCarrinho"
            class="bg-white-500 hover:bg-red-500 text-white font-bold py-0 px-4 rounded-full"
          >
            Carrinho
          </button>
        </div>
      </nav>
    </header>

    <div v-if="" class="grid gap-4 grid-cols-3">
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
        <div>
          <button
            @click="adicionarLivro(livro)"
            class="bg-yellow-500 hover:bg-yellow-800 text-black font-bold py-2 px-4 rounded-full"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="mostrarCarrinho">
    {{ carrinho }}
  </div>
</template>
