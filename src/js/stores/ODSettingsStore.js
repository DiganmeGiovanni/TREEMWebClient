
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var EVENT_CHANGE = 'event-odstore-change'
var TREMCons = require('../constants/TREEMConstants')
var oDService = require('../services/ODService')


var displayingPane = 'od-accounts'
var oDAccounts = []
var oDAccountsFetchTries = 0

var currentFolder
var foldersNavHistory = []

var subFolders = []
var subFoldersFetchTries = 0
var subFoldersOwner = 0

var ODSettingsStore = objectAssign({}, EventEmitter.prototype, {
  
  getDisplayingPane() {
    return displayingPane
  },
  
  getODAccounts() {
    return oDAccounts
  },
  
  getODAccountsFetchTries() {
    return oDAccountsFetchTries
  },

  getCurrentFolder() {
    return currentFolder
  },

  getFoldersNavHistory() {
    return foldersNavHistory
  },
  
  getSubFolders() {
    return subFolders
  },

  getSubFoldersFetchTries() {
    return subFoldersFetchTries
  },

  getSubFoldersOwner() {
    return subFoldersOwner
  },

  receiveODAccounts(incomingODAccounts) {
    oDAccounts = incomingODAccounts
    oDAccountsFetchTries += 1

    this.emitChange()
  },

  receiveChildren(incomingSubFolders, parentFolderId) {
    subFolders = incomingSubFolders
    subFoldersFetchTries += 1
    
    if (parentFolderId && parentFolderId != "") {
      var currentFolderIndex = foldersNavHistory.indexOf(parentFolderId)
      if (currentFolderIndex == -1) {
        foldersNavHistory.push(parentFolderId)
      }
      else {
        foldersNavHistory = foldersNavHistory.slice(0, currentFolderIndex + 1)
      }
    }
    else { // User is in root folder again (Clear history)
      foldersNavHistory = []
    }
    
    this.emitChange()
  },

  apiFetchAccounts() {
    oDService.fetchODAccounts()
  },
  
  apiFetchChildren(oDEmail, filter, parentFolderId) {
    oDService.fetchChildren(oDEmail, filter, parentFolderId)
    displayingPane = 'od-folders'
    subFoldersFetchTries = 0
    subFoldersOwner = oDEmail

    this.emitChange()
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

    case TREMCons.actionTypes.api.OD_FETCH_ACCOUNTS:
      ODSettingsStore.apiFetchAccounts()
      break
    
    case TREMCons.actionTypes.api.OD_FETCH_CHILDREN:
      ODSettingsStore.apiFetchChildren(action.oDEmail, action.filter, action.parentFolderId)
      break

    case TREMCons.actionTypes.api.OD_RECEIVE_ACCOUNTS:
      ODSettingsStore.receiveODAccounts(action.oDAccounts)
      break

    case TREMCons.actionTypes.api.OD_RECEIVE_CHILDREN:
      ODSettingsStore.receiveChildren(action.subFolders, action.parentFolderId)
      break
  }
})


module.exports = ODSettingsStore