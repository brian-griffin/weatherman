import React, {Component} from 'react'
import {days, months} from '../constants/dates'
import './Forecast.scss'

/**
 * Forecast
 *
 * Parses the forecast data and outputs something nice
 */
class Forecast extends Component {
  getDateObject(timestamp) {
    let thisDate = new Date(timestamp*1000)
    let day = thisDate.getDay()
    let date = thisDate.getDate()
    let month = thisDate.getMonth()
    let hours = thisDate.getHours()
    let minutes = thisDate.getMinutes()
    let dateObj = {}

    if (hours < 10) hours = "0" + hours
    if (minutes < 10) minutes = "0" + minutes

    dateObj.dayOfWeek = days[day]
    dateObj.dayOfMonth = date
    dateObj.month = months[month]
    dateObj.time = hours+":"+minutes

    return  dateObj
  }

  render() {
    const scope = this

    return (
      <div className={'forecast'} data-component={'Forecast'}>
        {this.props.forecastData.map(function(item, i) {
          let dateObj = scope.getDateObject(item.dt)

          return (
            <div key={item.dt} className={'forecast-item'}>
              <div className={'main-items'}>
                <span className={'date '+dateObj.dayOfWeek}>
                  {dateObj.dayOfWeek} @{dateObj.time}
                </span>
                <span className="temp value">{Math.round(item.main.temp)}&deg;C</span>
                <span className="description">{item.weather[0].description}</span>
                <span className="icon">
                  <img src={'http://openweathermap.org/img/w/'+item.weather[0].icon+'.png'} />
                </span>
              </div>
              <div className={'sub-items'}>
                <span className="label temp">Min Temp</span>
                <span className="value temp">{Math.round(item.main.temp_min)}&deg;C</span>

                <span className="label temp">Max Temp</span>
                <span className="value temp">{Math.round(item.main.temp_max)}&deg;C</span>

                <span className="label rain">Rainfall</span>
                <span className="value rain">{item.rain['3h'] || 0}mm</span>

                <span className="label wind-speed">Wind Speed</span>
                <span className="value wind-speed">{Math.round(item.wind.speed)}mph</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

/**
 * Forecast propTypes
 */
Forecast.propTypes = {
  forecastData: React.PropTypes.array.isRequired
}

export default Forecast
