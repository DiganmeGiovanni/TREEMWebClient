
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var EVENT_CHANGE = 'event-user-change'
var TREEMCons    = require('../constants/TREEMConstants')
var TREEMKeys    = require('../constants/TREEMKeys')

var user = {
  fullName: '',
  email: ''
}


/******************************************************************************/

var UserStore = objectAssign({}, EventEmitter.prototype, {

  getUser() {
    return user
  },

  getUserEmail() {
    return user.email
  },

  getUserFullName() {
    return user.fullName
  },

  oDLogin: function () {
    var targetUrl = 'https://login.live.com/oauth20_authorize.srf?'
    targetUrl += 'client_id=' + TREEMKeys.API_OD_CLIENT_ID
    targetUrl += '&scope=wl.signin wl.basic wl.emails wl.offline_access onedrive.readonly'
    targetUrl += '&response_type=code'
    targetUrl += '&redirect_uri=http://treem.appspot.com/api/od/redirect'

    window.location = targetUrl
  },

  receiveUser(nUser) {
    user.fullName = nUser.fname + " " + nUser.lname
    user.email    = nUser.email

    this.emitChange()
  },

  logoutUser: function () {
    var self = this

    user.fullName = ""
    user.email    = ""

    self.emitChange()
  },

  userIsLoggedIn: function () {
    return user.email && user.email.length > 0
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

    case TREEMCons.actionTypes.USER_RESULT:
      UserStore.receiveUser(action.user)
      break
    
  }
})


module.exports = UserStore