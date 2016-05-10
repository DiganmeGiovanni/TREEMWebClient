
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var EVENT_CHANGE = 'event-od-library-store'
var TREEMCons    = require('../constants/TREEMConstants')

var oDLibFetchTries = 0
var oDMCollection = {}

var ODLibraryStore = objectAssign({}, EventEmitter.prototype, {
  
  getODLibFetchTries() {
    return oDLibFetchTries
  },
  
  getODMCollection() {
    return oDMCollection
  },
  
  receiveODMCollection(nODMCollection) {
    oDLibFetchTries += 1
    oDMCollection = nODMCollection
    
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
    
  }
})


module.exports = ODLibraryStore