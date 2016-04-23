
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

  oDCodeLogin: function (oDCode) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.USER_OD_CODE_LOGIN,
      oDCode: oDCode
    })
  }
}


module.exports = UserActions