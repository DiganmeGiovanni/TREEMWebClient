
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var EVENT_CHANGE = 'event-od-library-store'
var TREEMCons    = require('../constants/TREEMConstants')

var oDLibFetchTries = 0
var oDMCollection = {}

var focusedAlbumId = ''
var viewMode = 'grid' // grid | album-detail | artist

var ODLibraryStore = objectAssign({}, EventEmitter.prototype, {
  
  getODLibFetchTries() {
    return oDLibFetchTries
  },
  
  getODMCollection() {
    return oDMCollection
  },
  
  getFocusedAlbumId() {
    return focusedAlbumId
  },
  
  getViewMode() {
    return viewMode
  },
  
  receiveODMCollection(nODMCollection) {
    oDLibFetchTries += 1
    oDMCollection = nODMCollection
    
    this.emitChange()
  },
  
  viewGrid() {
    focusedAlbumId = ''
    viewMode = 'grid'
    
    this.emitChange()
  },
  
  viewAlbum(albumId) {
    focusedAlbumId = albumId
    viewMode = 'album-detail'
    
    this.emitChange()
  },

  //////////////////////////////////////////////////////////////////////////////

  emitChange: function() {
    this.emit(EVENT_CHANGE)
  },

  addChangeListener: function(callback) {
    this.on(EVENT_CHANGE, callback)
  },

  removeChangeListener: function(callback) {
    //this.removeListener(callback)
  },
})

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    
    case TREEMCons.actionTypes.api.OD_RECEIVE_MCOLLECTION:
      ODLibraryStore.receiveODMCollection(action.oDMCollection)
      break
    
    case TREEMCons.actionTypes.OD_LIBRARY_VIEW_ALBUM:
      ODLibraryStore.viewAlbum(action.albumId)
      break
    
    case TREEMCons.actionTypes.OD_LIBRARY_VIEW_GRID:
      ODLibraryStore.viewGrid()
      break
  }
})


module.exports = ODLibraryStore