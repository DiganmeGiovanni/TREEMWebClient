
var AppDispatcher = require('../dispatcher/AppDispatcher')
var TREEMCons     = require('../constants/TREEMConstants')

var UserActions = {

  loginUser: function () {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.USER_LOGIN
    })
  },

  logoutUser: function () {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.USER_LOGOUT
    })
  },

  oDLogin: function () {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.USER_OD_LOGIN
    })
  },
  
  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.USER_RESULT,
      user: user
    })
  },

}


module.exports = UserActions