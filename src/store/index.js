import { defineStore } from 'pinia'

export const useKryptonStore = defineStore('store', {
  state: () => ({
    count: 0,
    submisions: [],
    score: 0,
    progress: 0,
    currentSlide: 0,
  }),
  actions: {
    increment() {
      this.count++
      this.progress++
    },
    decrement() {
      this.count--
    },
    addScore() {
      this.score++
    },
    reset() {
      this.count = 0;
      this.score = 0;
      this.progress = 0;
      this.submisions = [];
      this.currentSlide = 0;

    },
    setSlide(slide) {
      this.currentSlide = slide
    }
  },
  getters: {
    getPerfomance() {
      if (this.progress > 0) {
        return (this.score/(this.progress * 4))*100
      }
      else {
        return 0
      }
    }
  },
  // enable persistence
  persist: true,
})