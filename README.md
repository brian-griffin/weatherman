# Weatherman App

Allows users to check the weather forecast and put on appropriate clothes for the day.

* Location is set to Edinburgh.
* Caches the forecast in localStorage to avoid problems with the API only returning forecast data once every 10 minutes during busy periods.

## Running the App locally

```bash
npm install
npm start
```

Then visit [http://localhost:8080](http://localhost:8080)

## Hosted demo

Visit [http://gr-weatherman.herokuapp.com/](http://gr-weatherman.herokuapp.com/)

## Technology

* NPM
* Webpack (so we can hot-load assets in development and precompile for production)
* Babel (so we can write ES6)
* React (view components)
* Vanilla JS (for everything else)
* SASS (styles)

## TODO

* Unit Tests (probably with Karma running in a PhantomJS).
* Grouping by day so we show each 3hr period for every day covered.
* 'Production' build to a `dist` folder for deploying.
* Handle errors (ie. if the API is down or we exceed the API limitations)
* Break down the repeated forecast items into a ForecastItem component as we're repeating a bunch of code
