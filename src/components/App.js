import React, { Component } from 'react'
import { connect } from 'react-redux'
import { search, geolocateBrowser } from '../actions'
import SearchNavBar from './searchNavBar'
import FacetsMenu from './facetsMenu'
import RestaurantTable from './restaurantTable'
import '../assets/app.scss'

class App extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  }

  //Just invoked immediately after the initial rendering occurs
  componentWillMount() {
    this.props.dispatch(geolocateBrowser())
    this.props.dispatch(search())
  }

  render() {
    return (
      <div className="app-container">
        <SearchNavBar />
        <FacetsMenu />
        <RestaurantTable />
      </div>
    )
  }
}

export default connect()(App)
