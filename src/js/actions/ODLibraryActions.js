
var AppDispatcher = require('../dispatcher/AppDispatcher')
var TREEMCons = require('../constants/TREEMConstants')

var ODLibraryActions = {
  
  receiveODMCollection(oDMCollection) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_RECEIVE_MCOLLECTION,
      oDMCollection: oDMCollection
    })
  }
}

module.exports = ODLibraryActions