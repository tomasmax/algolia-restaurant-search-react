import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addQuery, search } from '../actions'
import '../assets/searchNavBar.scss'

class SearchNavBar extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  }

  handleKeyPress = event => {
    this.props.dispatch(addQuery(event.target.value))
    this.props.dispatch(search())
  }

  render() {
    return (
      <div className="search-nav-bar">
        <input
          placeholder="Search for restaurants by Name, Cuisine, Location"
          type="search"
          onChange={ this.handleKeyPress }
          tabIndex="1"
        />
      </div>
    )
  }
}

export default connect()(SearchNavBar)