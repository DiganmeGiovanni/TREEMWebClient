
var AppDispatcher = require('../dispatcher/AppDispatcher')
var TREEMCons = require('../constants/TREEMConstants')
var oDService = require('../services/ODService')

var ServerActions = {

  oDCodeLogin: function (oDCode) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.USER_OD_CODE_LOGIN
    })
    
    oDService.oDCodeLogin(oDCode)
  },
}


module.exports = ServerActions