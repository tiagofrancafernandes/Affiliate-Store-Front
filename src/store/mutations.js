import {
  getType,
  typeIs,
  isObject,
  isArray,
} from '../helpers/types'

export function setSearchedMeals(state, meals) {
  state.searchedMeals = meals || []
}

export function setMealsByLetter(state, params) {
  if (isArray(params)) {
    params = {
      meals : isArray(params[0]) ? params[0] : params,
      toAppend : (isArray(params[0]) ? params[1] : null) || false,
    }
  }

  if (!isObject(params)) {
    params = {
      meals : params,
      toAppend : false,
    }
  }

  let {
    meals,
    toAppend,
  } = params;

  console.log('mutations: toAppend', toAppend);
  if (toAppend) {
    state.mealsByLetter = [
      ...state.mealsByLetter,
      ...(meals || []),
    ]

    return;
  }

  state.mealsByLetter = meals || [];
}

export function setMealsByIngredients(state, meals) {
  state.mealsByIngredient = meals || []
}

export function setIngredient(state, ingredient) {
  state.ingredient = ingredient
}

export function setLoading(state, loading) {
  state.loading = loading
}
