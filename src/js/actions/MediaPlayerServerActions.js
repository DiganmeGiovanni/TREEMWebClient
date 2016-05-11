
var AppDispatcher = require('../dispatcher/AppDispatcher')
var TREEMCons = require('../constants/TREEMConstants')
var oDService = require('../services/ODService')

var MediaPlayerServerActions = {

  queuePlaySong(artistName, albumName, coverUrl, song) {
    AppDispatcher.dispatch({
      actionType: TREEMCons.actionTypes.MEDIA_PLAYER_QUEUE_PLAY_SONG,
      artistName: artistName,
      albumName: albumName,
      coverUrl: coverUrl,
      song: song
    })

    var itemId  = song.fileId
    var oDEmail = song.ownerInfo.ODEmail
    oDService.fetchItemContentUrl(itemId, oDEmail)
  },
}

module.exports = MediaPlayerServerActions