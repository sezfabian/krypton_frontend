<template>
  <Carousel ref="carousel" v-model="currentSlide">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide - 1 }}</div>
    </Slide>
  </Carousel>

  <div>
    <button @click="next">Next</button>
    <input type="number" min="0" max="9" v-model="currentSlide" />
    <button @click="prev">Prev</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
const currentSlide = ref(0);
</script>