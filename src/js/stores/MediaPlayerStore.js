
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var TREEMCons = require('../constants/TREEMConstants')

var EVENT_CHANGE = 'store-media-player-change'

var queue = []
var currentQueueIndex = -1
var currentSongUrl = ''

var playing = false
var playFromStart = true

var MediaPlayerStore = objectAssign({}, EventEmitter.prototype, {

  isPlaying() {
    return playing
  },
  
  getPlayingFromStart() {
    return playFromStart
  },
  
  getCurrentSongUrl() {
    return currentSongUrl
  },
  
  getCurrentQueueIndex() {
    return currentQueueIndex
  },
  
  getCurrentSong() {
    if (queue[currentQueueIndex]) {
      return queue[currentQueueIndex]
    }
    else {
      return {
        artistName: '- - -',
        albumName: '- -',
        coverUrl: 'http://75orlessrecords.com/wp-content/themes/soundcheck/images/default-artwork.png',
        song: {
        }
      }
    }
  },

  getNextSong() {
    if (queue[currentQueueIndex + 1]) {
      return queue[currentQueueIndex + 1]
    }
    else {
      return null
    }
  },
  
  getQueue() {
    return queue
  },
  
  queueSong(artistName, albumName, coverUrl, song) {
    queue.push({
      artistName: artistName,
      albumName: albumName,
      coverUrl: coverUrl,
      song: song
    })
    
    this.emitChange()
  },

  queuePlaySong(artistName, albumName, coverUrl, song) {
    queue.push({
      artistName: artistName,
      albumName: albumName,
      coverUrl: coverUrl,
      song: song
    })

    this.playSongAt(queue.length - 1)
  },

  nextSong() {
    if (queue[currentQueueIndex + 1]) {
      this.playSongAt(currentQueueIndex + 1)
    }
  },

  playPause() {
    playing = !playing
    playFromStart = false

    this.emitChange()
  },
  
  playSongAt(index) {
    if (queue[index]) {
      playFromStart = true
      playing = true
      currentQueueIndex = index
      currentSongUrl = ''

      this.emitChange()
    }
  },
  
  receiveContentsUrl(itemId, contentsUrl) {
    if (queue[currentQueueIndex] && queue[currentQueueIndex].song.fileId === itemId) {
      currentSongUrl = contentsUrl
      this.emitChange()
    }
  },

  
  //////////////////////////////////////////////////////////////////////////////

  emitChange: function() {
    this.emit(EVENT_CHANGE)
  },

  addChangeListener: function(callback) {
    this.on(EVENT_CHANGE, callback)
  },

  removeChangeListener: function(callback) {
    //this.removeListener(callback)
  },
})

AppDispatcher.register(function (action) {
  
  switch (action.actionType) {
    
    case TREEMCons.actionTypes.MEDIA_PLAYER_QUEUE_SONG:
      MediaPlayerStore.queueSong(
        action.artistName,
        action.albumName,
        action.coverUrl,
        action.song
      )
      break

    case TREEMCons.actionTypes.MEDIA_PLAYER_QUEUE_PLAY_SONG:
      MediaPlayerStore.queuePlaySong(
        action.artistName,
        action.albumName,
        action.coverUrl,
        action.song
      )
      break
    
    case TREEMCons.actionTypes.api.OD_ITEM_RECEIVE_CONTENT_URL:
      MediaPlayerStore.receiveContentsUrl(
        action.itemId,
        action.contentsUrl
      )
      break

    case TREEMCons.actionTypes.MEDIA_PLAYER_PLAY_PAUSE:
      MediaPlayerStore.playPause()
      break

    case TREEMCons.actionTypes.MEDIA_PLAYER_NEXT_SONG:
      MediaPlayerStore.nextSong()
      break
  }
})

module.exports = MediaPlayerStore