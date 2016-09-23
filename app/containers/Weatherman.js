import React, {Component} from 'react'
import $ from 'jquery'
import * as API from '../constants/api'
import Forecast from '../components/Forecast'
import './Weatherman.scss'

class Weatherman extends Component {
  constructor(props){
    super(props)

    this.loadWeather = this.loadWeather.bind(this)
    this.fetchWeather = this.fetchWeather.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.setNewState = this.setNewState.bind(this)

    this.locationId = API.defaultLocationId
    this.forecastUrl = API.baseUrl+API.forecastPath+'?units=metric&APPID='+API.apiKey

    this.state = {
      isFetching: true,
      forecast: {}
    }
  }

  componentDidMount() {
    if (this.currentStoreIsValid()) {
      this.loadWeather()
    } else {
      this.fetchWeather()
    }
  }

  render() {
    let loading = null
    let details = null
    console.log('rendering with:', this.state)

    if (this.state.isFetching) {
      loading = <div className={'loading'}>Loading weather...</div>
    } else {
      details = (
        <div className={'details'}>
          <div className={'location'}>
            <span className={'label'}>Location</span>
            <span className={'value'}>{this.state.forecast.city.name}</span>
          </div>
          <Forecast forecastData={this.state.forecast.list}/>
        </div>
      )
    }

    return (
      <div className={'weatherman'} data-component={'Weatherman'}>
        <h1>Weatherman</h1>
        {loading}
        {details}
      </div>
    )
  }

  /**
   * loadWeather
   *
   * Makes a request to load the weather from localStorage
   */
  loadWeather() {
    console.log('attempting to load weather from localStorage')
    const scope = this

    let storedWeather = {
      forecast: JSON.parse(localStorage.forecast),
      updated: localStorage.updated,
      expires: localStorage.expires,
      error: false
    }

    this.setNewState(storedWeather)
  }

  /**
   * fetchWeather
   *
   * Makes a request to fetch the weather from the API
   */
  fetchWeather() {
    console.log('attemping to load weather from the API')
    const scope = this

    $.get(this.forecastUrl + '&id=' + this.locationId, function (response) {
      scope.handleResponse(response)
    })
  }

  /**
   * HandleResponse
   *
   * Handles the response from an API call
   */
  handleResponse(response) {
    console.log('handling API response:', response)
    const scope = this

    let now = Math.floor(Date.now() / 1000)
    let newState = {}

    if (response.cnt > 0) {
      newState.forecast = response
      newState.updated  = now
      newState.expires  = now + 600
      newState.error = false
    } else {
      newState.error = {
        updated: now,
        reason: "No forecast information from API"
      }
    }

    scope.setNewState(newState, true)
  }

  /**
   * setNewState
   *
   * Sets the new state and also makes a copy in localStorage to cover reloading the app
   */
  setNewState(newState, toStore) {
    console.log('setting new state to', newState)
    newState.isFetching = false
    this.setState(newState)

    // Store in localstorage if forecast has updated to avoid recalling until expired on reload
    if (toStore && newState.forecast) {
      console.log('...and updating localStorage')
      localStorage.forecast = JSON.stringify(newState.forecast)
      localStorage.expires = newState.expires
      localStorage.updated = newState.updated
    }
  }

  /**
   * currentStoreIsValid
   *
   * Checks if the current store is valid
   */
  currentStoreIsValid() {
    let now = Math.floor(Date.now() / 1000)

    console.log('currentStore is valid?', now <= localStorage.expires)
    return now <= localStorage.expires
  }
}

export default Weatherman
