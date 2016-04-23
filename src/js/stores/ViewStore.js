
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var EVENT_CHANGE = 'event-view-change'
var TREEMCons    = require('../constants/TREEMConstants')

var currentView = 'media-library'

var ViewStore = objectAssign({}, EventEmitter.prototype, {

  goToView: function (view) {
    currentView = view
    this.emitChange()
  },

  getCurrentView: function () {
    return currentView
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

    case TREEMCons.actionTypes.VIEW_GO_TO_VIEW:
      ViewStore.goToView(action.view)
      break
  }
})


module.exports = ViewStore