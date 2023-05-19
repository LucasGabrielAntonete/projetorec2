<script setup>
import { livros } from '@/_data/livros.js'
import { ref } from 'vue'
 
function incrementar(livro) {
  livro.value.quantidade++
}

function decrementar(livro) {
  if(livro.value.quantidade <= 0) {
alert('Os itens ja foram retirados')
  } else livro.value.quantidade--
}


</script>

<template>
  
<div class="flex">
  <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="livro in livros" :key="livro.id">
    <p>{{ livro.titulo }}</p>
    <p>{{ livro.autor }}</p>
    <p>{{ livro.preco }}</p>
    <p>{{ livro.quantidade }}</p>
    <div>
      <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="incrementar(ref(livro))">Incrementar</button>    
      </div> 
  </div>
    <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="decrementar(ref(livro))">Decrementar</button>
  </div>

</div>

</template>