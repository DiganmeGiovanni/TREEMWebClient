
var AppDispatcher = require('../dispatcher/AppDispatcher')
var TREEMCons = require('../constants/TREEMConstants')

var ODSettingsActions = {
  
  apiFetchAccounts() {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_FETCH_ACCOUNTS
    })
  },
  
  apiFetchChildren(oDEmail, filter, parentFolder) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_FETCH_CHILDREN,
      oDEmail: oDEmail,
      filter: filter,
      parentFolder: parentFolder
    })
  },
  
  receiveAccounts(oDAccounts) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_RECEIVE_ACCOUNTS,
      oDAccounts: oDAccounts
    })
  },

  receiveChildren(subFolders, parentFolder) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.api.OD_RECEIVE_CHILDREN,
      subFolders: subFolders,
      parentFolder: parentFolder
    })
  }
}


module.exports = ODSettingsActions