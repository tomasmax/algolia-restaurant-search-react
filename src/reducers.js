import { combineReducers } from 'redux'
import * as actions from './actions'

//REDUCERS
//Actions describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of reducers.

const restaurants = (state = [], action) => {
  if (action.type == actions.SET_RESTAURANTS) {
    return action.restaurants
  }
  if (action.type == actions.ADD_PAGE) {
    return [...state, ...action.hits]
  }
  return state
}

const nbHits = (state = null, action) => {
  if (action.type == actions.SET_NB_HITS) {
    return action.nbHits
  }
  return state
}

const query = (state = '', action) => {
  if (action.type == actions.ADD_QUERY) {
    return action.query
  }
  if (action.type == actions.CLEAR) {
    return ''
  }
  return state
}

const rating = (state = null, action) => {
  if (action.type == actions.SET_RATING) {
    return action.rating
  }
  if (action.type == actions.CLEAR) {
    return null
  }
  return state
}

const searchTime = (state = null, action) => {
  if (action.type == actions.SET_SEARCH_TIME) {
    return action.searchTime
  }
  return state
}

const currentPage = (state = 0, action) => {
  if (action.type == actions.SET_PAGE) {
    return action.page
  }
  return state
}

const pages = (state = 0, action) => {
  if (action.type == actions.SET_PAGE) {
    return action.total
  }
  return state
}

const selectedPayments = (state = [], action) => {
  if (action.type == actions.SELECT_PAYMENTS) {
    const index = state.indexOf(action.payment)
    if (index != -1) {
      state.splice(index, 1)
      return [...state]
    }

    return [...state, action.payment]
  }
  if (action.type == actions.CLEAR) {
    return []
  }
  return state
}

const foodType = (state = null, action) => {
  if (action.type == actions.SET_FOOD_TYPE) {
    if (state == action.foodType) {
      return null
    }
    return action.foodType
  }
  if (action.type == actions.CLEAR) {
    return null
  }
  return state
}

const foodTypes = (state = [], action) => {
  if (action.type == actions.SET_FOOD_TYPES) {
    const foodTypes = []

    for (const key in action.foodTypes) {
      if ({}.hasOwnProperty.call(action.foodTypes, key)) {
        foodTypes.push({ name: key, value: action.foodTypes[key] })
      }
    }
    return foodTypes
  }
  return state
}

const geolocation = (state = null, action) => {
  if (action.type == actions.SET_GEOLOCATION) {
    if (state == action.geolocation) {
      return null
    }
    return action.geolocation
  }

  return state
}

const app = combineReducers({
  restaurants,
  query,
  foodTypes,
  foodType,
  selectedPayments,
  currentPage,
  pages,
  rating,
  nbHits,
  searchTime,
  geolocation
})

export default app
