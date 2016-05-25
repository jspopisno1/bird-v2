
var React = require('react')
var initer = require('initers/react/app-redux.js')


const appRoutes = {
    path: '/',
    indexRoute: { onEnter: (nextState, replace) => replace('/test') },
    childRoutes: [
        {
            path: 'test',
            getComponent: (location, callback) => {
                require.ensure([], () => {
                    initer.injectReducer('test', require('./reducer.js').reducer)
                    callback(null, require('./MyApp'))
                })
            }
        }
    ]
}

module.exports = appRoutes