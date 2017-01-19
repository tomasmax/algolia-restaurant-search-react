import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setFoodType, search, selectPayments, clear } from '../actions'
import RatingFacet from './ratingStars'
import '../assets/facetsMenu.scss'
//A simple javascript utility for conditionally joining classNames together
import classNames from 'classnames'

class FacetMenuSelector extends React.Component {

  static propTypes = {
    facet: React.PropTypes.object.isRequired,
    selectFoodType: React.PropTypes.func.isRequired,
    checked: React.PropTypes.bool.isRequired
  }

  handleClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.selectFoodType(this.props.facet.name)
  }

  render() {
    const facet = this.props.facet
    return (
      <li className={classNames({'facet-checked': this.props.checked})} onClick={this.handleClick}>
        <a href="#">
          {facet.name} <span className="facet-restaurant-sum">{facet.value}</span>
        </a>
      </li>
    )
  }
}

class PaymentOptionFacet extends React.Component {

  static propTypes = {
    selectedPayments: React.PropTypes.array.isRequired,
    selectPayments: React.PropTypes.func.isRequired
  }

  isChecked(name) {
    return this.props.selectedPayments.indexOf(name) != -1
  }

  handleClick = event => {
    this.props.selectPayments(event.target.id || event.target.parentElement.id)
  }

  renderPaymentOption(name) {
    return (
      <li id={name} key={name} className={classNames({'facet-checked': this.isChecked(name)})}>
        <input type="checkbox" checked={this.isChecked(name)} readOnly name={name}/> 
        <label htmlFor={name}>{name}</label>
      </li>
    )
  }

  render() {
    const paymentOptions = ['Visa', 'MasterCard', 'AMEX', 'Discover']
    return (
      <ul onClick={this.handleClick}>
        {paymentOptions.map(this.renderPaymentOption.bind(this))}
      </ul>
    )
  }
}

class FacetsMenu extends React.Component {

  static propTypes = {
    clearFacets: React.PropTypes.func.isRequired,
    foodTypes: React.PropTypes.array,
    selectedFoodType: React.PropTypes.string,
    selectFoodType: React.PropTypes.func.isRequired,
    selectedPayments: React.PropTypes.array.isRequired,
    selectPayments: React.PropTypes.func.isRequired
  }

  handleClear = () => {
    this.props.clearFacets()
  }

  render() {
    return (
      <div className="facets-menu">
        <h2 className="text-center">
          <a href="#" className={classNames( { 'clear-facets': true, 'hidden': this.props.selectedPayments.length == 0  && this.props.selectedFoodType == null})} onClick={this.handleClear}>
            Clear Facet Refinements
          </a>
        </h2>

        <h2>Cuisine/Food Type</h2>
        <ul>
          {this.props.foodTypes.map(facet =>
            <FacetMenuSelector
              facet={facet}
              key={facet.name}
              selectFoodType={this.props.selectFoodType}
              checked={this.props.selectedFoodType == facet.name}
            />
          )}
        </ul>
        <h2>Rating</h2>
        <RatingFacet />
        <h2>Payment Options</h2>
        <PaymentOptionFacet
          selectedPayments={this.props.selectedPayments} 
          selectPayments={this.props.selectPayments}
        />
      </div>
    )
  }
}

export default connect(state => ({
  foodTypes: state.foodTypes,
  selectedFoodType: state.foodType,
  selectedPayments: state.selectedPayments
}), dispatch => ({
  selectFoodType: name => {
    dispatch(setFoodType(name))
    dispatch(search())
  },
  selectPayments: payment => {
    dispatch(selectPayments(payment))
    dispatch(search())
  },
  clearFacets: () => {
    dispatch(clear())
    dispatch(search())
  }
}))(FacetsMenu)
