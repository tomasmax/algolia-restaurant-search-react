import React, {Component} from 'react'
import { connect } from 'react-redux'
import { setRating, search } from '../actions'
import '../assets/ratingStars.scss'
//A simple javascript utility for conditionally joining classNames together
import classNames from 'classnames'

export class Rating extends React.Component {

  static propTypes = {
    rating: React.PropTypes.number,
    selectRating: React.PropTypes.func,
    checked: React.PropTypes.bool.isRequired
  }

  handleClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.selectRating(this.props.rating)
  }


  render() {

    const stars = [...Array(5).keys()]
    return (
      <div className={classNames('rating', { 'rating-checked' : this.props.checked, [`rating-${this.props.rating}`]: this.props.rating })} onClick={this.handleClick}>
        {stars.map(i =>
          <div key={i} className="rating-star"/>
        )}
      </div>
    )
  }
}


class RatingFacet extends React.Component {

  static propTypes = {
    selectRating: React.PropTypes.func,
    selectedRating: React.PropTypes.number
  }

  isChecked(name) {
    return this.props.selectedPayments.indexOf(name) != -1
  }

  render() {
    const indexArray = [...Array(6).keys()]
    return (
      <div className='rating-facet'>
        {indexArray.map(i =>
          <Rating 
            key={i}
            rating={i}
            selectRating={this.props.selectRating}
            checked={this.props.selectedRating == i}
          />
        )}

      </div>
    )
  }
}

export default connect(state => ({
  selectedRating: state.rating
}), dispatch => ({
  selectRating: rating => {
    dispatch(setRating(rating))
    dispatch(search())
  }
}))(RatingFacet)
