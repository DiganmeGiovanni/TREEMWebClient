
var request = require('request')
var TREEMCons = require('../constants/TREEMConstants')

var SpotifyService = {
  
  searchAlbum(artist, title, callback) {

    var query = "artist:" + artist + " album:" + title
    var params = {
      method: 'GET',
      url: TREEMCons.apiUrls.SPOTIFY_SEARCH,
      qs: {
        q: query,
        type: 'album'
      }
    }
    
    request(params, function (err, res, body) {
      if (!err) {
        body = JSON.parse(body)
        callback(null, body)
      }
      else {
        callback(err, null)
      }
    })
  }
}

module.exports = SpotifyService