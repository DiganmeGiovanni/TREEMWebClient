
var AppDispatcher = require('../dispatcher/AppDispatcher')
var oDService = require('../services/ODService')
var TREEMCons = require('../constants/TREEMConstants')

var ODServerActions = {
  
  scanLibraries: function (oDEmail) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_SCAN_LIBRARIES,
      oDEmail: oDEmail
    })

    oDService.scanLibraries(oDEmail)
  },

  scanStatus: function (oDEmail) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_SCAN_STATUS
    })

    oDService.scanStatus(oDEmail)
  },
}


module.exports = ODServerActions
