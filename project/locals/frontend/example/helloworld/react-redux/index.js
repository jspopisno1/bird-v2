var React = require('react')
var initer = require('initers/react/app-redux')

initer.configureStore()
initer.init({
    routes: require('./routes.js')
})