import axiosClient from '../axiosClient';
import state from "./state";
import {
  getType,
  typeIs,
  isObject,
  isArray,
} from '../helpers/types'

export function searchMeals({ commit }, keyword) {
  axiosClient.get(`search.php?s=${keyword}`)
    .then(({ data }) => {
      commit('setSearchedMeals', data.meals)
    })
}

export function searchMealsByLetter({ commit }, params) {
  if (!isObject(params)) {
    params = {
      letter : params,
      pageNumber : 1,
      toAppend : false,
    }
  }

  let {
    letter,
    pageNumber,
    toAppend,
  } = params;

  if (!letter) {
    return;
  }

  if (null === pageNumber) {
    pageNumber = (null === pageNumber || !pageNumber) ? 1 : (parseInt(pageNumber) ? parseInt(pageNumber) + 1 : 1);
  }

  pageNumber = isNaN(pageNumber) ? 1 : pageNumber;

  axiosClient.get(`search.php?f=${letter}`)
    .then(({ data }) => {
      commit('setMealsByLetter', {
        meals: data.meals,
        toAppend: toAppend,
      })
      commit('setLoading', false)
    })
}

export function searchMealsByIngredient({ commit }, ing) {
  axiosClient.get(`filter.php?i=${ing}`)
    .then(({ data }) => {
      commit('setMealsByIngredients', data.meals)
    })
}

export function makeLoading({ commit }, loadingState) {
    commit('setLoading', loadingState)
}
