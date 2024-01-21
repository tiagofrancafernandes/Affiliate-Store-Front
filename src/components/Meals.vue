<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 px-8">
    <MealItem v-for="meal of meals" :key="meal.idMeal" :meal="meal" />
  </div>
  <div v-if="isLoading" class="relative rounded-xl overflow-auto p-8">
    <div class="flex items-center justify-center">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
          disabled
        >
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </button>
    </div>
  </div>
  <div v-if="!meals.length && !isLoading" class="flex justify-center text-gray-600 p-8">
    There are no meals
  </div>
</template>

<script setup>
import MealItem from './MealItem.vue';

const {
  meals,
  isLoading,
} = defineProps({
  meals: {
    required: true,
    type: Array,
  },
  isLoading: {
    required: false,
    type: Boolean,
    default: false,
  }
})

</script>
