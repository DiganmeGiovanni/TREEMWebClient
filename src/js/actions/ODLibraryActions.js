
var AppDispatcher = require('../dispatcher/AppDispatcher')
var TREEMCons = require('../constants/TREEMConstants')

var ODLibraryActions = {
  
  receiveODMCollection(oDMCollection) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_RECEIVE_MCOLLECTION,
      oDMCollection: oDMCollection
    })
  },
  
  viewAlbum(albumId) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.OD_LIBRARY_VIEW_ALBUM,
      albumId: albumId
    })
  },
  
  viewGrid() {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.OD_LIBRARY_VIEW_GRID
    })
  }
}

module.exports = ODLibraryActions