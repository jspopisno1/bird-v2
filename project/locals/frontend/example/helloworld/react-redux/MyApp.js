var React = require('react')

var {connect} = require('react-redux')
var {bindActionCreators} = require('redux')

var initer = require('initers/react/app-redux.js')
var {triggers} = require('./reducer')

var MyPage = require('./MyPage')

var mapState = (state) => ({
    name: state.test.name
})

var mapDispatch = (dispatch) => bindActionCreators({
    changeName: triggers.changeName
}, dispatch)


var MyApp = React.createClass({

    getInitialState() {
        return {
            name: ''
        }
    },

    componentDidMount() {
        // console.log(this.props)
        initer.setPageParams(this.props)

        var name = this.props.location.query.name
        this.props.changeName(name)
        this.setState({name})
    },

    changeName(e) {
        var val = e.target.value
        this.props.changeName(val)
        this.setState({
            name: val
        })
    },

    render: function() {
        console.log(this.props)

        var self = this
        var props = this.props
        var state = this.state

        var content = <div>
            <input type="text" id="lala"
                   value={state.name}
                   onChange={this.changeName}
            />
            <h1>Hello {props.name}</h1>
        </div>

        return <MyPage pageContent={content}></MyPage>
    }
})

module.exports = connect(mapState, mapDispatch)(MyApp)