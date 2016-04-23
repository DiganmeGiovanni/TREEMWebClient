
var React = require('react')
var UserActions = require('../actions/UserActions')

var LandingPage = React.createClass({

  componentDidMount() {
    var odCode = this._getUrlParam('odcode')
    if (odCode) {
      UserActions.oDCodeLogin(odCode)
    }
  },

  loginOneDrive() {
    UserActions.oDLogin()
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12"><h1>TREEM App</h1></div>
          <div className="col-xs-12">
            <button className="btn btn-primary" onClick={this.loginOneDrive}>
              Login with OneDrive
            </button>
          </div>
        </div>
      </div>
    )
  },

  _getUrlParam(param) {
    var url = window.location.href
    if (url.indexOf('?') > 0) {
      var keyValuePairs = url.substring(url.indexOf('?') + 1).split('&')
      for (var i=0; i <keyValuePairs.length; i++) {
        var keyValue = keyValuePairs[i].split('=')
        if (keyValue[0] === param) {
          return keyValue[1]
        }
      }
    }

    return false
  }

})


module.exports = LandingPage