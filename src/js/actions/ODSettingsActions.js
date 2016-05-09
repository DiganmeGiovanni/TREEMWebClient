
var AppDispatcher = require('../dispatcher/AppDispatcher')
var oDService = require('../services/ODService')
var TREEMCons = require('../constants/TREEMConstants')

var ODSettingsActions = {
  
  apiFetchAccounts() {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_FETCH_ACCOUNTS
    })
  },
  
  apiFetchChildren(oDEmail, filter, parentFolderId) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_FETCH_CHILDREN,
      oDEmail: oDEmail,
      filter: filter,
      parentFolderId: parentFolderId
    })
  },

  apiFetchLibraries(oDEmail) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_FETCH_LIBRARIES,
      oDEmail: oDEmail
    })
  },
  
  createODLibrary(folderId, folderName, oDEmail) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_CREATE_LIBRARY,
      folderId: folderId,
      folderName: folderName,
      oDEmail: oDEmail
    })
  },
  
  receiveAccounts(oDAccounts) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_RECEIVE_ACCOUNTS,
      oDAccounts: oDAccounts
    })
  },

  receiveChildren(subFolders, parentFolderId) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_RECEIVE_CHILDREN,
      subFolders: subFolders,
      parentFolderId: parentFolderId
    })
  },
  
  receiveODLibraries(oDLibraries) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_RECEIVE_LIBRARIES,
      oDLibraries: oDLibraries
    })
  },
  
  scanStarted() {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_SCAN_STARTED,
    })
  },
  
  scanFinished() {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_SCAN_FINISHED
    })
  }
}


module.exports = ODSettingsActions