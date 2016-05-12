
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var oDService = require('../services/ODService')
var TREEMCons = require('../constants/TREEMConstants')

var EVENT_CHANGE = 'store-media-player-change'

/**
 * Each queue item must have the next properties:
 * - artistName: String,
 * - albumName: String,
 * - contentUrl: String,   // Usually updated when user plays song
 * - coverUrl: String,
 * - song: {
 *     fileId: String
 *     ownerInfo: {
 *       ODEmail: String
 *     }
 *   }
 *
 * @type {Array}
 */
var queue = []
var currentIndex = -1
var playbackPaused = true
var skipToCurrent  = false

var MediaPlayerStore = objectAssign({}, EventEmitter.prototype, {

  getCurrentIndex() {
    return currentIndex
  },
  
  getPlaybackPaused: function() {
    return playbackPaused
  },
  
  getSkipToCurrent() {
    return skipToCurrent
  },

  getQueue() {
    return queue
  },

  clearAllContentsUrls() {
    for(var i = 0; i < queue.length; i++) {
      queue[i].contentUrl = null
    }
  },

  nextSong() {
    this.clearAllContentsUrls()
    currentIndex += 1
    skipToCurrent  = true
    playbackPaused = false

    // Request contents urls
    var currentSong = queue[currentIndex]
    if (currentSong) {
      this.emitChange()
      
      var itemId = currentSong.song.fileId
      var oDEmail = currentSong.song.ownerInfo.ODEmail
      oDService.fetchItemContentUrl(itemId, oDEmail)
    }
  },
  
  prevSong() {
    this.clearAllContentsUrls()
    currentIndex -= 1
    skipToCurrent  = true
    playbackPaused = false

    // Request contents urls
    var currentSong = queue[currentIndex]
    if (currentSong) {
      this.emitChange()
      
      var itemId = currentSong.song.fileId
      var oDEmail = currentSong.song.ownerInfo.ODEmail
      oDService.fetchItemContentUrl(itemId, oDEmail)
    }
  },
  
  playPause() {
    playbackPaused = !playbackPaused
    this.emitChange()
  },
  
  queueSong(artistName, albumName, coverUrl, song) {
    queue.push({
      artistName: artistName,
      albumName: albumName,
      coverUrl: coverUrl,
      song: song
    })
  },

  queuePlaySong(artistName, albumName, coverUrl, song) {
    queue.push({
      artistName: artistName,
      albumName: albumName,
      coverUrl: coverUrl,
      song: song
    })

    currentIndex = queue.length - 1 
    skipToCurrent = true
    playbackPaused= false
    
    this.emitChange()
  },

  receiveContentsUrl(itemId, contentsUrl) {
    console.log('Receiving url for: ' + itemId)
    
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].song.fileId === itemId) {
        queue[i].contentUrl = contentsUrl

        this.emitChange()
        skipToCurrent = false
      }
      else {
        queue[i].contentUrl = null
      }
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
    this.removeListener(callback)
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
    
    case TREEMCons.actionTypes.MEDIA_PLAYER_PREV_SONG:
      MediaPlayerStore.prevSong()
      break
  }
})

module.exports = MediaPlayerStore