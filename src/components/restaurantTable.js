import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchTime, showNextPage, clear } from '../actions'
import { Rating } from './ratingStars'
import '../assets/restaurantTable.scss'
import classNames from 'classnames'

class RestaurantRow extends React.Component {

  static propTypes = {
    restaurant: React.PropTypes.object.isRequired
  }

  render() {
    const restaurant = this.props.restaurant
    return (
      <li>
        <div className="restaurant">
          <div className="img-wrapper restaurant_image">
            <img src={ restaurant.image_url } />
          </div>
          <div className="restaurant_wrapper">
            <div className="restaurant_name" dangerouslySetInnerHTML={{__html: restaurant._highlightResult.name.value}}/>
            <div className="restaurant_rating">
              <div className="restaurant_rating_value">{restaurant.stars_count}</div>&nbsp;
              <Rating rating={Math.floor(restaurant.stars_count)}/>&nbsp;
              <div className="restaurant_rating_reviews_sum">({restaurant.reviews_count} reviews)</div>
            </div>
            <div className="restaurant_info">
              <div className="restaurant_info_food">{restaurant.food_type}</div>&nbsp;|&nbsp;
              <div className="restaurant_info_neighborhood">{restaurant.neighborhood}</div>&nbsp;|&nbsp;
              <div className="restaurant_info_city">{restaurant.city} ({restaurant.state})</div>&nbsp;|&nbsp;
              <div className="restaurant_info_price_range">{restaurant.price_range}</div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

class RestaurantTable extends React.Component {
  
  static propTypes = {
    restaurants: React.PropTypes.array,
    nbHits: React.PropTypes.number,
    dispatch: React.PropTypes.func.isRequired,
    showMore: React.PropTypes.bool,
    searchTime: React.PropTypes.number
  }

  handleShowMore = () => {
    this.props.dispatch(showNextPage())
  }

  handleClear = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.dispatch(clear())
    this.props.dispatch(search())
  }

  render() {
    if (!this.props.restaurants || !this.props.restaurants.length) {
      return (
        <div className="restaurant-table">
          <ul className="no-hits">
            No results found with the actual facet refinements. Try to clear them and search again!
            <br/><br/>
            <br/><br/>
            <a href="#" className="no-hits-button" onClick={this.handleClear}>
              Clear Facet Refinements
            </a>
          </ul>
        </div>
      )
    }

    return (
      <div className="restaurant-table">
        <div className="search-info">
          <span className="search-info-nb">{this.props.nbHits} results found</span>
          <span className="search-info-time"> in {this.props.searchTime} seconds</span>
          <span className="search-info-hr"/>
        </div>
        <ul>
          {this.props.restaurants.map(restaurant =>
            <RestaurantRow 
              key={restaurant.objectID} 
              restaurant={restaurant}
            />
          )}
        </ul>

        <div className={classNames('show-more', { 'hidden': !this.props.showMore})} onClick={this.handleShowMore}>
          Show More
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  restaurants: state.restaurants,
  showMore: (state.currentPage + 1 < state.pages),
  nbHits: state.nbHits,
  searchTime: state.searchTime
}))(RestaurantTable)

