
var AppDispatcher = require('../dispatcher/AppDispatcher')
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
  }
}


module.exports = ODSettingsActions