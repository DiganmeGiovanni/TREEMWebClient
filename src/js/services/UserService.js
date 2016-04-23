
var request = require('request')
var TREEMCons = require('../constants/TREEMConstants')

var UserService = {

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
  }
}


module.exports = UserService