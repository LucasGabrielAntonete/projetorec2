<script setup>
import { livros } from '@/_data/livros.js'
import { ref } from 'vue'
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
  if (livroCarrinho) {
    livroCarrinho.quantidade = 1
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

const finalizacaoCompra = ref(false)
const mostrarCarrinho = ref(false)

// Parte da lógica para o formulario.

const user = ref({
  primeiro: '',
  segundo: '',
  cartao: '',
  seguranca: '',
  cidade: '',
  estado: '',
  zip: ''
})
const enviarForm = ref(false)
</script>

<template>
  <div
    class="absolute min-h-screen w-full bg-black z-10 opacity-60 overflow-hidden"
    v-if="mostrarCarrinho"
  ></div>
  <div class="absolute left-0 min-h-screen bg-white z-20 w-1/4 shadow-lg" v-if="mostrarCarrinho">
    <div class="shadow-lg" :class="finalizacaoCompra ? 'opacity-50' : ''">
      <div class="hover:bg-purple-100" v-for="livro in carrinho" :key="livro.id">
        <p class="ml-2">Item: {{ livro.titulo }}</p>
        <p class="ml-2">quantidade: {{ livro.quantidade }}</p>
        <p class="ml-2">Preço: {{ livro.preco }}</p>
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

    <div
      class="absolute min-h-screen w-full bg-black z-20 opacity-60 overflow-hidden"
      v-if="finalizacaoCompra"
    >
      <div
        v-if="finalizacaoCompra"
        class="absolute m-auto left-0 right-0 z-30 bg-purple-200 w-2/4 h-2/3"
      >
        <div>
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6 ml-3 mt-10">
              <button
                class="absolute right-0 mr-4 mt-7 bg-yellow-500 hover:bg-yellow-800 text-black font-mono py-2 px-4 rounded-full"
                @click="finalizacaoCompra = !finalizacaoCompra"
              >
                Fechar Fomulario
              </button>
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-3"
                >
                  Primeiro Nome
                </label>
                <input
                  type="text"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 ml-3 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  v-model="user.primeiro"
                  placeholder="Ex: Jair"
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="grid-last-name"
                  type="text"
                  v-model="user.ultimo"
                  placeholder="Ex: Bolsonaro"
                />
              </div>
              <div class="w-full md:w-3/5 mb-6 px-3">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Cartão de Crédito
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    v-model="user.cartao"
                    placeholder="Numero do Cartão"
                  />
                </div>
              </div>
              <div class="w-full md:w-2/5">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Numero de Segurança
                </label>
                <input
                  type="number"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  v-model="user.seguranca"
                  placeholder="Ex: 923"
                />
              </div>
              
              <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0 ml-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-zip"
                >
                  Zip
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 mr-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-zip"
                  type="text"
                  placeholder="90210"
                  v-model="user.zip"
                />
              </div>
              <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Estado
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    v-model="user.estado"
                  ></select>
                </div>
              </div>
              <div class="w-full md:w-1/4 px-3 mb-6 'md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  cidade
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    v-model="user.cidade"
                  ></select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
