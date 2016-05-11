
var AppDispatcher = require('../dispatcher/AppDispatcher')
var TreemCons = require('../constants/TREEMConstants')

var MediaPlayerActions = {

  nextSong() {
    AppDispatcher.dispatch({
      actionType: TreemCons.actionTypes.MEDIA_PLAYER_NEXT_SONG
    })
  },

  playPause() {
    AppDispatcher.dispatch({
      actionType: TreemCons.actionTypes.MEDIA_PLAYER_PLAY_PAUSE
    })
  },

  prevSong() {
    AppDispatcher.dispatch({
      actionType: TreemCons.actionTypes.MEDIA_PLAYER_PREV_SONG
    })
  },
  
  receiveItemContentsUrl(itemId, contentsUrl) {
    AppDispatcher.dispatch({
      actionType: TreemCons.actionTypes.api.OD_ITEM_RECEIVE_CONTENT_URL,
      itemId: itemId,
      contentsUrl: contentsUrl
    })
  },

  queueSong(artistName, albumName, coverUrl, song) {
    AppDispatcher.dispatch({
      actionType: TreemCons.actionTypes.MEDIA_PLAYER_QUEUE_SONG,
      artistName: artistName,
      albumName: albumName,
      coverUrl: coverUrl,
      song: song
    })
  },

  queueAlbum(artistName, album) {
    AppDispatcher.dispatch({
      actionType: TreemCons.actionTypes.MEDIA_PLAYER_QUEUE_ALBUM,
      artistName: artistName,
      album: album
    })
  }
}

module.exports = MediaPlayerActions