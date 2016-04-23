
var AppDispatcher = require('../dispatcher/AppDispatcher')
var TREEMCons     = require('../constants/TREEMConstants')

var ViewActions = {

  goToView: function (view) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.VIEW_GO_TO_VIEW,
      view: view
    })
  }
}


module.exports = ViewActions