
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var EVENT_CHANGE = 'event-odstore-change'
var TREMCons = require('../constants/TREEMConstants')
var oDService = require('../services/ODService')


var displayingPane = 'od-accounts'
var oDAccounts = []
var oDAccountsFetchTries = 0

var oDLibraries = []
var oDLibrariesFetchTries = 0

var currentFolder
var foldersNavHistory = []

var subFolders = []
var subFoldersFetchTries = 0
var librariesOwner = ''

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
  
  getODLibraries() {
    return oDLibraries
  },
  
  getODLibrariesFetchTries() {
    return oDLibrariesFetchTries
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

  getLibrariesOwner() {
    return librariesOwner
  },

  receiveODAccounts(incomingODAccounts) {
    oDAccounts = incomingODAccounts
    oDAccountsFetchTries += 1

    this.emitChange()
  },
  
  receiveODLibraries(incomingODLibraries) {
    oDLibraries = incomingODLibraries
    oDLibrariesFetchTries += 1

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
    displayingPane = 'od-accounts'
    oDService.fetchODAccounts()
  },
  
  apiFetchChildren(oDEmail, filter, parentFolderId) {
    oDService.fetchChildren(oDEmail, filter, parentFolderId)
    displayingPane = 'od-folders'
    subFolders = []
    subFoldersFetchTries = 0

    this.emitChange()
  },
  
  apiFetchODLibraries(oDEmail) {
    displayingPane = 'od-libraries'
    oDLibrariesFetchTries = 0
    librariesOwner = oDEmail

    oDService.fetchODLibraries(oDEmail)
    this.emitChange()
  },
  
  createODLibrary(folderId, folderName, oDEmail) {
    oDService.createODLibrary(folderId, folderName, oDEmail)
    this.apiFetchODLibraries(librariesOwner)
  },

  scanStarted: function () {
    displayingPane = 'od-scanning'
    this.emitChange()
  },

  scanFinished: function () {
    displayingPane = 'od-accounts'
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

    case TREMCons.actionTypes.api.OD_CREATE_LIBRARY:
      ODSettingsStore.createODLibrary(action.folderId, action.folderName, action.oDEmail)
      break

    case TREMCons.actionTypes.api.OD_FETCH_ACCOUNTS:
      ODSettingsStore.apiFetchAccounts()
      break
    
    case TREMCons.actionTypes.api.OD_FETCH_CHILDREN:
      ODSettingsStore.apiFetchChildren(action.oDEmail, action.filter, action.parentFolderId)
      break

    case TREMCons.actionTypes.api.OD_FETCH_LIBRARIES:
      ODSettingsStore.apiFetchODLibraries(action.oDEmail)
      break

    case TREMCons.actionTypes.api.OD_RECEIVE_ACCOUNTS:
      ODSettingsStore.receiveODAccounts(action.oDAccounts)
      break

    case TREMCons.actionTypes.api.OD_RECEIVE_CHILDREN:
      ODSettingsStore.receiveChildren(action.subFolders, action.parentFolderId)
      break

    case TREMCons.actionTypes.api.OD_RECEIVE_LIBRARIES:
      ODSettingsStore.receiveODLibraries(action.oDLibraries)
      break

    case TREMCons.actionTypes.api.OD_SCAN_STARTED:
      ODSettingsStore.scanStarted()
      break

    case TREMCons.actionTypes.api.OD_SCAN_FINISHED:
      ODSettingsStore.scanFinished()
      break
  }
})


module.exports = ODSettingsStore