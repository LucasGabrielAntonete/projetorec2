<script setup>
import { livros } from '@/_data/livros.js'
import { ref } from 'vue'
import { carrinho, finalizacaoCompra, mostrarCarrinho } from '@/_data/carrinho.js'
import { formulario } from '@/components/Formulario.vue'

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
  if (livroCarrinho) {
    livroCarrinho.quantidade += 1
  } else {
    carrinho.value.push(livro)
    livro.quantidade++
  }
}

function LimpaCarrinho() {
  carrinho.value = []
}

function removerLivro(livro) {
  carrinho.value.quantidade = 1
  carrinho.value.splice(carrinho.value.indexOf(livro), 1)
  livros.value[livro.id - 1].adicionado = false
}


</script>

<template>
  <div
    class="absolute min-h-screen w-full bg-black z-10 opacity-60 overflow-hidden"
    v-if="mostrarCarrinho"
  ></div>
  <div class="absolute left-0 min-h-screen bg-white z-10 w-1/4 shadow-lg" v-if="mostrarCarrinho">
    <div class="shadow-lg" :class="finalizacaoCompra ? 'opacity-60' : ''">
      <div class="hover:bg-purple-100" v-for="livro in carrinho" :key="livro.id">
        <p class="ml-2">Item: {{ livro.titulo }}</p>
        <p class="ml-2">quantidade: {{ livro.quantidade }}</p>
        <p class="ml-2">Preço: R$:{{ livro.preco }}</p>
        <p class="ml-2">Preço total do item: R$:{{ livro.preco * livro.quantidade }}</p>
        <button
          @click="removerLivro(livro)"
          class="bg-black hover:bg-red-900 text-white font-bold px-4 rounded-full mb-2 mr-4 ml-2"
        >
          Retirar Item
        </button>
        <button
          class="absolute bg-red-500 hover:bg-red-800 text-black font-bold px-4 rounded-full mb-2 mr-2"
          @click="decrementar(ref(livro))"
        >
          -
        </button>
        <button
          class="absolute bg-blue-500 hover:bg-blue-800 text-black font-bold px-4 rounded-full mb-2 ml-12"
          @click="incrementar(ref(livro))"
        >
          +
        </button>
        <hr />
      </div>
      <div class="">
        <button
          @click="LimpaCarrinho()"
          class="absolute bg-blue-500 hover:bg-blue-800 text-black font-bold py-2 px-4 rounded-full bottom-0 mb-2 ml-2"
        >
          Limpar Carrinho
        </button>
      </div>
      <div>
        <button
          @click="mostrarCarrinho = !mostrarCarrinho"
          class="absolute bg-red-500 hover:bg-red-800 text-black font-bold py-2 px-4 rounded-full bottom-0 mb-2 mr-2 right-0"
        >
          Fechar Carrinho
        </button>

        <div>
          <button
            @click="finalizacaoCompra = !finalizacaoCompra"
            class="absolute m-auto left-0 right-0 bottom-12 mb-2 bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-black py-2 px-4 border border-yellow-500 hover:border-black rounded"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  </div>

  <header>
    <div class="fixed top-0 shadow-lg w-screen right-0" :class="[mostrarCarrinho ? 'w-3/4' : '']">
      <div class="container flex flex-row items-center gap-4 text-black py-6 right-0 bg-white">
        <div class="flex mx-10">
          <svg
            @click="mostrarCarrinho = !mostrarCarrinho"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            "
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
    </div>
  </header>
  <div class="grid gap-4 grid-cols-3 pt-20">
    <div class="m-5 rounded overflow-hidden shadow-lg" v-for="livro in livros" :key="livro.id">
      <p>Titulo: {{ livro.titulo }}</p>
      <p>Autor: {{ livro.autor }}</p>
      <p>Preço: R$:{{ livro.preco }}</p>
      <p>Quantidade: {{ livro.quantidade }}</p>
      <div>
        <button
          @click="adicionarLivro(livro)"
          class="bg-yellow-500 hover:bg-yellow-800 text-black font-bold py-2 px-4 rounded-full mb-2 ml-2"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
<formulario />
   
        </div>

    
</template>
