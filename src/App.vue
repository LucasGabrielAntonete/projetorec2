<script setup>
import { livros } from '@/_data/livros.js'

 

</script>

<template>
  
<div class="listagem-livros">
  <p>livros</p>
  <div class="card-livros" v-for="livro in livros" :key="livro.id">
    <p>{{ livro.titulo }}</p>
    <p>{{ livro.autor }}</p>
    <p>{{ livro.preco }}</p>
  
  </div>

</div>

</template>