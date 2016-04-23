
var React = require('react')

var LandingPage = require('../components/LandingPage.react')
var UserStore   = require('../stores/UserStore')


var TREEMApp = React.createClass({

  getInitialState() {
    return {
      userIsLoggedIn: UserStore.userIsLoggedIn()
    }
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._onChange())
  },

  render() {
    if (this.state.userIsLoggedIn) {
      return (
        <h1>TREEM App</h1>
      )
    }
    else {
      return (
        <LandingPage />
      )
    }
  },

  _onChange: function () {
    this.setState({
      userIsLoggedIn: UserStore.userIsLoggedIn()
    })
  },
})

module.exports = TREEMApp