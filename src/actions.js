import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'

//Algoliasearch API credentials
const client = algoliasearch('A8KMD2TQJ5', 'ea7ee206077218e1b5f37e68b071c7ca')
const helper = algoliasearchHelper(client, 'restaurants_demo', {
  facets: ['*'],
  disjunctiveFacets: ['food_type', 'payment_options'],
  maxValuesPerFacet: 12
})

//ACTIONS
//Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().

export const ADD_QUERY = 'ADD_QUERY'
export const addQuery = query => ({
  type: ADD_QUERY,
  query
})

export const SET_RESTAURANTS = 'SET_RESTAURANTS'
export const setRestaurants = restaurants => ({
  type: SET_RESTAURANTS,
  restaurants
})

export const SET_NB_HITS = 'SET_NB_HITS'
export const setNbHits = nbHits => ({
  type: SET_NB_HITS,
  nbHits
})

export const SET_FOOD_TYPES = 'SET_FOOD_TYPES'
export const setFoodTypes = foodTypes => ({
  type: SET_FOOD_TYPES,
  foodTypes
})

export const SET_FOOD_TYPE = 'SET_FOOD_TYPE'
export const setFoodType = foodType => ({
  type: SET_FOOD_TYPE,
  foodType
})

export const SET_RATING = 'SET_RATING'
export const setRating = rating => ({
  type: SET_RATING,
  rating
})

export const SET_PAGE = 'SET_PAGE'
export const setPage = (page, total) => ({
  type: SET_PAGE,
  page,
  total
})

export const ADD_PAGE = 'ADD_PAGE'
export const addPage = hits => ({
  type: ADD_PAGE,
  hits
})

export const SET_SEARCH_TIME = 'SET_SEARCH_TIME'
export const setSearchTime = searchTime => ({
  type: SET_SEARCH_TIME,
  searchTime
})

export const SELECT_PAYMENTS = 'SELECT_PAYMENTS'
export const selectPayments = payment => ({
  type: SELECT_PAYMENTS,
  payment
})

export const CLEAR = 'CLEAR'
export const clear = () => ({
  type: CLEAR
})

export const SET_GEOLOCATION = 'SET_GEOLOCATION'
export const setGeolocation = geolocation => ({
  type: SET_GEOLOCATION,
  geolocation
})

export function removeFacets() {
  (dispatch) => {
    helper.clearRefinements()
    dispatch(clear())
  }
}

export function geolocateBrowser() {
  return (dispatch, getState) => {
    //ask for geolocation in the browser
    let position;
    navigator.geolocation.getCurrentPosition(position => {
            position = JSON.stringify(position);
         },
         (error) => alert(error.message),
         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      )
    dispatch(setGeolocation(position))
  }
}

//search adds differents filter to algolia helper, performs the search and changes the state of the app with the results
export function search() {
  return (dispatch, getState) => {
    //remove previous faet refinements
    helper.clearRefinements()

    //Add rating facet refinmenet, search >= selectedRating
    if (getState().rating) {
      helper.addNumericRefinement('stars_count', '>=', getState().rating)
    }
    //Add food type facet refinmenet
    if (getState().foodType) {
      helper.addDisjunctiveFacetRefinement('food_type', getState().foodType)
    }
    //Payments refinement
    if (getState().selectedPayments) {
      getState().selectedPayments.forEach(payment => {
        if (payment == 'Discover') {
          helper.addDisjunctiveFacetRefinement('payment_options', 'Carte Blanche')
          helper.addDisjunctiveFacetRefinement('payment_options', 'Diners Club')
        }
        helper.addDisjunctiveFacetRefinement('payment_options', payment)
      })
    }

    const position = getState.geolocation

    //check if the user allowed to provide location from the browser
    if (position != null) {
      //Use provided location
      helper.setQueryParameter('aroundLatLng', position)
    }
    else {
      //fallback scenario search around IP
      helper.setQueryParameter('aroundLatLngViaIP', true)
    }

    //set the query to perform the search
    helper.setQuery(getState().query)
    //search
    helper.searchOnce().then(result => {
        dispatch(setPage(helper.getPage(), result.content.nbPages))
        if (result.content.disjunctiveFacets && result.content.disjunctiveFacets[0]) {
          dispatch(setFoodTypes(result.content.disjunctiveFacets[0].data))
        }
        if (result.content.hits) {
          dispatch(setSearchTime(result.content.processingTimeMS / 1000))
          dispatch(setNbHits(result.content.nbHits))
          dispatch(setRestaurants(result.content.hits))
        }
      })
    
  }
}

export function showNextPage() {
  return (dispatch, getState) => {
    helper
      .setPage(getState().currentPage + 1)
      .searchOnce().then(result => {
        dispatch(setPage(helper.getPage(), result.content.nbPages))
        dispatch(addPage(result.content.hits))
      })
  }
}
