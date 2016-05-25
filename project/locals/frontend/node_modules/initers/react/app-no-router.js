module.exports = {
    /**
     *
     * @param opts
     *  reducers : reducers for this page
     *  Page : the root element
     */
    init: function (opts, ready) {
        opts = opts || {}

        var ReactDom = require('react-dom')
        var React = require('react')

        var Page = opts.Page

        var render = function() {
            ReactDom.render(
                <Page {...opts.props}></Page>,
                document.getElementById('root')
            )
        }

        render()
        ready && ready(render)
    }
}