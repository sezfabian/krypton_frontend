<template>
  <nav class="navbar navbar-dark bg-white position-fixed top-0 w-100 z-index-5 top">
    <router-link to="/" class="text-dark text-xxlg"><h2>Krypton Practice</h2></router-link> 
    <button class="btn btn-dark mt-3" @click="store.reset()">
      <i class="fas fa-redo"></i>
      Restart</button>
    <p class="text-dark text-xlg">Number of Submissions {{ store.currentSlide }} Score {{ store.score }}/{{ store.progress * 4 }} Perfomance
     <b class="text-success" v-if="store.getPerfomance >= 70">{{ store.getPerfomance }} %</b>
     <b class="text-danger" v-if="store.getPerfomance < 70">{{ store.getPerfomance }} % </b></p>
  </nav>
  <div class="text-dark text-lg mt-10">
  <router-view />
  </div>
</template>


<script setup>
import { useKryptonStore } from '@/store'
const store = useKryptonStore()

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  z-index: 100;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
