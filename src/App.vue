<script setup>
import { livros } from '@/_data/livros.js'
import { ref, computed } from 'vue'
import { carrinho } from '@/_data/carrinho.js'
import { Swal } from 'sweetalert2'

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
    livroCarrinho.quantidade = livro.quantidade
  } else {
    carrinho.value.push(livro)
    carrinho.value.livro.quantidade++
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

const mostrarLoja = ref(true)
const finalizacaoCompra = ref(false)
const mostrarCarrinho = ref(false)

// Parte da lógica para o formulario.

const user = ref({
  primeiro: '',
  segundo: '',
  cartao: '',
  cidade: '',
  estado: '',
  zip: ''
})
</script>

<template>
  <div class="absolute min-h-screen w-full bg-black z-10 opacity-60"  v-if="mostrarCarrinho"></div>
  <div class="absolute left-0 min-h-screen bg-white z-40 w-1/4 shadow-lg " :class="finalizacaoCompra ? 'opacity-60' : ''" v-if="mostrarCarrinho">
    <div class="">
      <div v-for="livro in carrinho" :key="livro.id">
        <p>Item: {{ livro.titulo }}</p>
        <p>quantidade: {{ livro.quantidade }}</p>
        <p>Preço: {{ livro.preco }}</p>
        <button
          @click="removerLivro(livro)"
          class="bg-red-500 hover:bg-red-800 text-black font-bold px-4 rounded-full mb-2 mr-2"
        >
          Retirar Item
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

    <div v-if="finalizacaoCompra" class="absolute m-auto left-0 right-0
 z-50 bg-white w-2/4 h-2/3">
      <div>
        <p class="text-pink-500">AAAAAAAAAAAAA</p>
      </div>
    </div>
  </div>
</template>
