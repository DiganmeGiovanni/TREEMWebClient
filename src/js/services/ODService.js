
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

  createODLibrary: function(folderId, folderName, oDEmail) {
    var params = {
      method: 'POST',
      url: TREEMCons.apiUrls.OD_LIBRARY,
      form: {
        folderid: folderId,
        odemail: oDEmail,
        foldername: folderName
      }
    }

    request(params, function (err, res, body) {
      if (!err) {
        // body = JSON.parse(body)
      }
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
  
  fetchODLibraries(oDEmail) {
    var params = {
      method: 'GET',
      url: TREEMCons.apiUrls.OD_LIBRARIES,
      qs: {
        odemail: oDEmail
      }
    }
    
    request(params, function (err, res, body) {
      if (!err) {
        body = JSON.parse(body)
        oDSettingsActions.receiveODLibraries(body)
      }
    })
  },

  fetchChildren(oDEmail, filter, parentFolderId) {
    var params = {
      method: 'GET',
      url: TREEMCons.apiUrls.OD_CHILDREN,
      qs: {
        odemail: oDEmail,
        filter: filter
      }
    }

    if (parentFolderId && parentFolderId != "") {
      params.qs.parentId = parentFolderId
    }

    request(params, function (err, res, body) {
      if (!err) {
        body = JSON.parse(body)
        oDSettingsActions.receiveChildren(body.value, parentFolderId)
      }
    })
  },
  
  scanLibraries: function (oDEmail) {
    var self = this

    var params = {
      method: 'GET',
      url: TREEMCons.apiUrls.OD_SCAN_LIBS,
      qs: {
        odemail: oDEmail
      }
    }
    
    request(params, function (err, res, body) {
      if (!err && res.statusCode === 200) {
        oDSettingsActions.scanStarted()
        setTimeout(function () {
          self.scanStatus(oDEmail)
        }, 5000)
      }
      else {
        //console.error('Can not start scan just now ...')
      }
    })
  },
  
  scanStatus: function (oDEmail) {
    var self = this
    var params = {
      method: 'GET',
      url: TREEMCons.apiUrls.OD_SCAN_STATUS,
      qs: {
        odemail: oDEmail
      }
    }

    request(params, function (err, res, body) {
      if (!err) {
        body = JSON.parse(body)
        if (!body.inProgress && body.success) {
          oDSettingsActions.scanFinished()
        }
        else {
          setTimeout(function () {
            self.scanStatus(oDEmail)
          }, 5000)
        }
      }
    })
  }
}


module.exports = ODService