
var React = require('react')

var Header = require('./Header')
var Footer = require('./Footer')

module.exports = ({pageContent}) => (
    <div>
        <Header></Header>
        {pageContent}
        <Footer></Footer>
    </div>
)