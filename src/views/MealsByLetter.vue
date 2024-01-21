<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Meals by Letter</h1>
  </div>
  <div class="flex flex-wrap justify-center gap-3 px-8 mb-6">
    <router-link
      :to="{ name: 'byLetter', params: { letter } }"
      v-for="letter of letters"
      :key="letter"
      class="w-2 h-2 flex items-center justify-center hover:text-orange-500 hover:scale-150 transition-all"
      v-bind:class="{
          'font-bold text-orange-500 scale-150': letter == currentLetter(),
      }"
    >
      {{ letter }}
    </router-link>
  </div>

  <Meals
    :meals="meals"
    :isLoading="isLoading"
  />

  <div class="relative rounded-xl overflow-auto p-8">
    <div class="flex items-center justify-center">
      <CustomButton
        v-on:click="loadMore()"
        class="cursor-pointer"
        v-if="meals.length && !isLoading"
      >
          Load more...
      </CustomButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, watch, ref, } from "vue";
import { useRoute } from "vue-router";
import store from "../store";
import Meals from "../components/Meals.vue";
import CustomButton from "../components/parts/Button.vue";

const route = useRoute();
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const meals = computed(() => store.state.mealsByLetter);
const isLoading = computed(() => store.state.loading);

watch(route, () => {
  store.dispatch("searchMealsByLetter", {
    letter: route.params.letter,
    pageNumber: 1,
    toAppend: false,
  });
});

onMounted(() => {
  store.dispatch("searchMealsByLetter", {
    letter: route.params.letter,
    pageNumber: 1,
    toAppend: false,
  });
});

let currentLetter = () => route.params.letter;
let pageNumber = ref(1);

const getPageNumberAndIncrement = () => {
  let current = parseInt(pageNumber.value);
  pageNumber.value = current + 1;
  return current;
};

const loadMore = () => {
  let pageNumber = getPageNumberAndIncrement();
  store.dispatch("searchMealsByLetter", {
    letter: route.params.letter,
    pageNumber: pageNumber,
    toAppend: true,
  });
}
</script>
