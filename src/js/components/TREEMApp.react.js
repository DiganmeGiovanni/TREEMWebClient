
var React = require('react')

var UserStore = require('../stores/UserStore')
var ViewStore = require('../stores/ViewStore')

var LandingPage = require('./LandingPage.react')
var HeaderBar   = require('./HeaderBar.react')
var SideBar     = require('./SideBar.react')
var MediaGrid   = require('./MediaGrid.react')
var ODSettings  = require('./odsettings/ODSettings.react.js')
var ODLibrary   = require('./mediagrid/ODLibrary.react')
var MediaPlayer = require('./MediaPlayer.react')

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
      else if (this.state.currentView === 'oneDrive') {
        currentComponent = (<ODLibrary />)
      }

      return (
        <div className="full-height">
          <HeaderBar />
          <div className="columns full-height-minus-bars">
            <SideBar currentView={this.state.currentView} />
            {currentComponent}
          </div>
          <MediaPlayer />
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