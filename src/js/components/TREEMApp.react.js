
var React = require('react')

var UserStore = require('../stores/UserStore')
var ViewStore = require('../stores/ViewStore')

var LandingPage = require('../components/LandingPage.react')
var HeaderBar   = require('./HeaderBar.react')
var SideBar     = require('./SideBar.react')
var MediaGrid   = require('./MediaGrid.react')
var ODSettings  = require('./odsettings/ODSettings.react.js')

function getAppState() {
  return {
    userIsLoggedIn: UserStore.userIsLoggedIn(),
    currentView: ViewStore.getCurrentView(),
  }
}

var TREEMApp = React.createClass({

  getInitialState() {
    return getAppState()
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange)
    ViewStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._onChange)
    ViewStore.removeChangeListener(this._onChange)
  },

  render() {
    if (this.state.userIsLoggedIn) {

      var currentComponent = (<MediaGrid />)
      if (this.state.currentView === 'googleDrive') {
        currentComponent = (<ODSettings />)
      }

      return (
        <div className="full-height">
          <HeaderBar />
          <div className="columns full-height-minus64">
            <SideBar currentView={this.state.currentView} />
            {currentComponent}
          </div>
        </div>
      )
    }
    else {
      return (
        <LandingPage />
      )
    }
  },

  _onChange: function () {
    this.setState(getAppState())
  },
})

module.exports = TREEMApp