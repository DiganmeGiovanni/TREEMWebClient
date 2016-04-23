
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var EVENT_CHANGE = 'event-user-change'
var TREEMCons    = require('../constants/TREEMConstants')
var TREEMKeys    = require('../constants/TREEMKeys')
var userService  = require('../services/ODService')


/******************************************************************************/

var UserStore = objectAssign({}, EventEmitter.prototype, {

  oDLogin: function () {
    var targetUrl = 'https://login.live.com/oauth20_authorize.srf?'
    targetUrl += 'client_id=' + TREEMKeys.API_OD_CLIENT_ID
    targetUrl += '&scope=wl.signin wl.basic wl.emails wl.offline_access onedrive.readonly'
    targetUrl += '&response_type=code'
    targetUrl += '&redirect_uri=http://treem.appspot.com/api/od/redirect'

    window.location = targetUrl
  },

  oDCodeLogin: function (oDCode) {
    var self = this

    userService.oDCodeLogin(oDCode, function (err, user) {
      if (err) {
        //console.error('Error while login user on backend')
        //console.error(err)
      }
      else {
        user = JSON.parse(user)

        TREEMCons.user.fullName = user.fname + " " + user.lname
        TREEMCons.user.email    = user.email

        self.emitChange()
      }
    })
  },

  logoutUser: function () {
    var self = this

    TREEMCons.user.fullName = ""
    TREEMCons.user.email    = ""

    self.emitChange()
  },

  userIsLoggedIn: function () {
    return true //TREEMCons.user.email && TREEMCons.user.email.length > 0
  },

  emitChange: function() {
    this.emit(EVENT_CHANGE)
  },

  addChangeListener: function(callback) {
    this.on(EVENT_CHANGE, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(callback)
  },
})

AppDispatcher.register(function (action) {
  switch (action.actionType) {

    case TREEMCons.actionTypes.USER_LOGOUT:
      UserStore.logoutUser()
      break

    case TREEMCons.actionTypes.USER_OD_LOGIN:
      UserStore.oDLogin()
      break

    case TREEMCons.actionTypes.USER_OD_CODE_LOGIN:
      UserStore.oDCodeLogin(action.oDCode)
      break
  }
})


module.exports = UserStore