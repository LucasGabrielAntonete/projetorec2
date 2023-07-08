<script setup>
import { finalizacaoCompra } from '@/_data/carrinho.js'
import { validacao } from '@/_data/user.js'

</script>

<template>

<div class="formulario">
<div 
      class="absolute min-h-screen w-full bg-black z-10 opacity-60 overflow-hidden"
      v-if="finalizacaoCompra"
    ></div>
    <div
      v-if="finalizacaoCompra"
      class="absolute m-auto left-0 right-0 z-40 bg-purple-200 w-2/4 h-2/3"
    >
    
        <div class="w-full max-w-lg">
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
                  type="text"
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
                type="text"
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
              <div>
                <button
                  @click="validacao()"
                  class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  Finalizar Cadastro
                </button>
              </div>
              <div v-if="mensagemErro">
                <p>Voce esqueceu de preencher algum campo</p>
              </div>
              <div v-if="mostraFormularioFinal">
                <p>Seu cadastro foi feito e suas compras foram finalizadas</p>
              </div>
            </div>
          </div>
          </div>
          </div>
   
</template>