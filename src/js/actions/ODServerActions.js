
var AppDispatcher = require('../dispatcher/AppDispatcher')
var oDService = require('../services/ODService')
var TREEMCons = require('../constants/TREEMConstants')

var ODServerActions = {
  
  itemContentUrl(itemId, oDEmail) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_ITEM_FETCH_CONTENT_URL
    })
    
    oDService.fetchItemContentUrl(itemId, oDEmail)
  },
  
  fetchODMCollection(email) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_FETCH_MCOLLECTION
    })
    
    oDService.fetchODMCollection(email)
  },
  
  scanLibraries: function (email) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_SCAN_LIBRARIES,
      email: email
    })

    oDService.scanLibraries(email)
  },

  scanStatus: function (email) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_SCAN_STATUS
    })

    oDService.scanStatus(email)
  },
}


module.exports = ODServerActions
