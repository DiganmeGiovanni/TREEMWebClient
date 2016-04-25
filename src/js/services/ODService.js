
var request = require('request')
var oDSettingsActions = require('../actions/ODSettingsActions')
var TREEMCons = require('../constants/TREEMConstants')

var ODService = {

  oDCodeLogin(oDCode, callback) {

    var params = {
      method: 'GET',
      url: TREEMCons.apiUrls.USER_OD_CODE_LOGIN,
      qs: {
        code: oDCode
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  fetchODAccounts: function () {
    var params = {
      method: 'GET',
      url: TREEMCons.apiUrls.OD_ACCOUNTS,
      qs: {
        'email': TREEMCons.user.email
      }
    }

    request(params, function (err, res, body) {
      if (!err) {
        body = JSON.parse(body)
        oDSettingsActions.receiveAccounts(body)
      }
    })
  },

  fetchChildren(oDEmail, filter, parentFolder) {
    var params = {
      method: 'GET',
      url: TREEMCons.apiUrls.OD_CHILDREN,
      qs: {
        odemail: oDEmail,
        filter: filter
      }
    }

    if (parentFolder && parentFolder.id && parentFolder.id != "") {
      params.qs.parentId = parentFolder.id
    }

    request(params, function (err, res, body) {
      if (!err) {
        body = JSON.parse(body)
        oDSettingsActions.receiveChildren(body.value, parentFolder)
      }
    })
  }
}


module.exports = ODService