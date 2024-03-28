<template>
    <div>
        <button class="btn btn-dark me-5" @click="Previous()">Prev</button>
        <input class="mx-3 mt-n3 text-lg rounded border-0" type="number" min="0" max="9" v-model="currentSlide" />
        <button class="btn btn-dark" @click="Next()">Next</button>
    </div>
    <div class="d-flex  mt-8 text-warning justify-content-center text-center" v-if="fetching">
            <pulse-loader :loading="loading" :color="red" :size="size"></pulse-loader>
            <h5 class="text-dark mx-5">Fetching Prompts...</h5>
        </div> 
    <Carousel ref="carousel" v-model="currentSlide" :mouseDrag=false touchDrag=false v-else >
      <Slide v-for="prompt in prompts" :key="prompt.id" class="d-block align-items-center flex-wrap">
        <h6 class="text-info py-2" v-if="prompts.length < 0"> Loading Prompts </h6>
        <div class="carousel__item col-lg-12 d-block px-lg-6 px-2 py-3 text-start">
          <h6 class="text-info py-2"> Prompt: {{ prompt.id }} </h6>
          <p class="text-dark">  {{ prompt.prompt }} </p>
          <div class=" " v-if="prompt.special_case === true && show_results">
          <h6 class="text-primary py-2"> Special Case </h6>
          <i class="fa fa-flag-checkered text-success"></i>
          </div>
          <div class="row mx-5">
            <p class="text-dark text-bold">Is the prompt in a foreign language?</p>
            <div class="text-dark text-sm"><input type="radio" v-model="user_choices.is_english" :value=false /> Yes
                <input type="radio" class="ms-3" v-model="user_choices.is_english" :value=true /> No
            </div>
            <div class="text-dark text-sm " v-if="show_results">
                <p class="text-info"> <b class="text-danger" v-if="results.is_english === 'Wrong'">{{ results.is_english }}</b> 
                <b class="text-success" v-if="results.is_english === 'Correct'"> {{ results.is_english }}</b>
                Criteria: {{ prompt.is_english_criteria_info.criteria }}</p>
            </div>
          </div>
          <div v-if="user_choices.is_english">
          <div class="mx-6">
            <p class="text-dark text-sm mt-4">Mark all relevant features: </p>
            <p class="text-dark mt-4">Clear Intent:</p>
            <div class="text-dark text-sm"><input type="radio" v-model="user_choices.has_intent" :value=true /> Yes
                <input type="radio" class="ms-3" v-model="user_choices.has_intent" :value=false /> No
            </div>
            <div class="text-dark text-sm text-info" v-if="show_results && user_choices.has_intent !== null">
                <p class="text-info"><b class="text-danger" v-if="results.has_intent === 'Wrong'">{{ results.has_intent }}</b>
                    <b class="text-success" v-if="results.has_intent === 'Correct'">{{ results.has_intent }}</b>
                    Criteria: {{ prompt.has_intent_criteria_info.criteria }}</p>
            </div>
          </div>
          <div class="mx-6">
            <p class="text-dark mt-4">Contextual Relevance:</p>
            <div class="text-dark text-sm"><input type="radio" v-model="user_choices.has_relevance" :value=true /> Yes
                <input type="radio" class="ms-3" v-model="user_choices.has_relevance" :value=false /> No
            </div>
            <div class="text-dark text-sm text-info" v-if="show_results && user_choices.has_relevance !== null">
                <p class="text-info"><b class="text-danger" v-if="results.has_relevance === 'Wrong'">{{ results.has_relevance }}</b>
                   <b class="text-success" v-if="results.has_relevance === 'Correct'"> {{ results.has_relevance }}</b>
                   Criteria: {{ prompt.has_context_relevance_criteria_info.criteria }}</p>
            </div>
          </div>
          <div class="mx-6">
            <p class="text-dark mt-4">Sufficient Complexity:</p>
            <div class="text-dark text-sm"><input type="radio" v-model="user_choices.has_complexity" :value=true /> Yes
                <input type="radio"  class="ms-3" v-model="user_choices.has_complexity" :value=false /> No
            </div>
            <div class="text-dark text-sm text-info" v-if="show_results && user_choices.has_complexity !== null">
                <p class="text-info"><b class="text-danger" v-if="results.has_complexity === 'Wrong'">{{ results.has_complexity }}</b>
                <b class="text-success" v-if="results.has_complexity === 'Correct'"> {{ results.has_complexity }}</b>
                Criteria: {{ prompt.has_complexity_criteria_info.criteria }}</p>
            </div>
          </div>
          <div class="mx-6">
            <p class="text-dark mt-4">Requires a Follow-up Question:</p>
            <div class="text-dark text-sm"><input type="radio" v-model="user_choices.requires_followup" :value=true /> Yes
                <input type="radio" class="ms-3" v-model="user_choices.requires_followup" :value=false /> No
            </div>
            <div class="text-dark text-sm mb-3 text-info" v-if="show_results && user_choices.requires_followup !== null">
                <p class="text-info"><b class="text-danger" v-if="results.requires_followup === 'Wrong'" >{{ results.requires_followup }}</b>
                    <b class="text-success" v-if="results.requires_followup === 'Correct'"> {{ results.requires_followup }}</b>
                    Criteria: {{ prompt.require_follow_up_criteria_info.criteria }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4">
            <button @click="Previous()"
            class="btn-sm mb-4 rounded w-lg-10 border-0 mt-3 mx-4 mx-lg-6 bg-gradient-info">
            <a class="text-white"> Prev </a>
            </button>
          
            <button v-if="user_choices.is_english !== null && user_choices.has_intent !== null
            && user_choices.has_relevance !== null && user_choices.has_complexity !== null
            && user_choices.requires_followup !== null || user_choices.is_english === false"
            class="btn-sm mb-4 rounded  w-lg-10 text-white border-0 mt-3 mx-2 me-4 mx-lg-6 bg-gradient-success"
            @click="compare(currentSlide)">
            <i class="fas fa-check"></i>
            SUBMIT </button>

            <button @click="Next()"
            class="btn-sm mb-4 rounded  w-lg-10 border-0 mt-3 mx-1 mx-lg-6 bg-gradient-info"><a class="text-white"> Next </a></button>
        </div>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>

    </Carousel>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
  import axios from 'axios'
  import { useKryptonStore } from '@/store'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  
  import 'vue3-carousel/dist/carousel.css'
  
  export default defineComponent({
    name: 'CustomCarousel',

    data() {
      return {

        currentSlide: 0,
        fetching: true,
        user_choices: {
            is_english: null,
            has_intent: null,
            has_relevance: null,
            has_complexity: null,
            requires_followup: null,
        },
        results: {
            is_english: null,
            has_intent: null,
            has_relevance: null,
            has_complexity: null,
            requires_followup: null,
        },
        show_results: false,
        prompts: [],
      }
    },
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
      PulseLoader
    },

    watch: {
        currentSlide() {
            this.show_results = false
            this.user_choices = {
                is_english: null,
                has_intent: null,
                has_relevance: null,
                has_complexity: null,
                requires_followup: null,
            }
            this.results = {
                is_english: null,
                has_intent: null,
                has_relevance: null,
                has_complexity: null,
                requires_followup: null,
            };
            this.scrollToTop()
        }
    },

    methods: {
        compare(id) {
            this.store.increment();
            this.show_results = true;
            this.store.setSlide(id)
            if (this.user_choices.is_english === this.prompts[id].is_english) {
                this.results.is_english = "Correct"
                if (this.user_choices.is_english === false)
                    this.store.score = this.store.score + 4
            }
            else {
                this.results.is_english = "Wrong"
            }
            if (this.user_choices.has_intent === this.prompts[id].has_intent) {
                this.results.has_intent = "Correct"
                this.store.score = this.store.score + 1
            }
            else {
                this.results.has_intent = "Wrong"
            }
            if (this.user_choices.has_relevance === this.prompts[id].has_context_relevance) {
                this.results.has_relevance = "Correct"
                this.store.score = this.store.score + 1
            }
            else {
                this.results.has_relevance = "Wrong"
            }
            if (this.user_choices.has_complexity === this.prompts[id].has_complexity) {
                this.results.has_complexity = "Correct"
                this.store.score = this.store.score + 1
            }
            else {
                this.results.has_complexity = "Wrong"
            }
            if (this.user_choices.requires_followup === this.prompts[id].require_follow_up) {
                this.results.requires_followup = "Correct"
                this.store.score = this.store.score + 1
            }
            else {
                this.results.requires_followup = "Wrong"
            }
        },

        Next() {
            if (this.currentSlide < this.prompts.length - 1) {
                this.currentSlide++;
            }
         },
        Previous() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },

        scrollToTop() {
            window.scrollTo(0,0);
        },
        // fetch prompts
        fetchPrompts() {
            this.fetching = true
            axios.get('https://ecommercekrypton.azurewebsites.net/training/prompts/').then((response) => {
                this.prompts = response.data
                this.fetching = false
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.fetching = true
        this.fetchPrompts();
    },
    setup() {
        return {
            store: useKryptonStore(),
        }

    }
  })
  </script>
  
  <style>
  .carousel__item {
    width: 100%;
    background-color: whitesmoke;
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .carousel__slide {
    padding: 10px;
    height: 250vh;
  }
  
  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: 5px solid rgba(255, 255, 255, 0);
  }
  </style>
  