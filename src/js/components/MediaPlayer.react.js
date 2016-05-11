
var React = require('react')
var MediaPlayerStore = require('../stores/MediaPlayerStore')

var mediaPlayerActions = require('../actions/MediaPlayerActions')
var oDServerActions = require('../actions/ODServerActions')

const audioPlayer1 = $('<audio />', {id: 'audioPlayer1', class: 'hidden'})

function getState() {
  return {
    currentSong: MediaPlayerStore.getCurrentSong(),
    nextSong: MediaPlayerStore.getNextSong(),
    currentSongUrl: MediaPlayerStore.getCurrentSongUrl(),
    playing: MediaPlayerStore.isPlaying(),
    playingFromStart: MediaPlayerStore.getPlayingFromStart()
  }
}

var MediaPlayer = React.createClass({

  getInitialState() {
    return getState()
  },

  componentDidMount() {
    MediaPlayerStore.addChangeListener(this._onChange)

    $('body').append(audioPlayer1)
  },

  componentWillUnmount() {
    MediaPlayerStore.removeChangeListener(this._onChange)
    $('#audioPlayer1').remove()
  },

  render() {
    var albumName  = this.state.currentSong.albumName  || ' - - '
    var songName   = this.state.currentSong.song.title || '- - - -'
    var coverUrl   = this.state.currentSong.coverUrl   || 'defaultImageUrl'

    this.initPlayerConfiguration()

    var playBtnClass = "fa fa-play"
    if (this.state.currentSongUrl && this.state.playing) {
      playBtnClass = "fa fa-pause"
    }
    else if (this.state.playing && !this.state.currentSongUrl) {
      playBtnClass = "fa fa-spin fa-fw fa-spinner"
    }

    return (
      <div className="media-player text-center">

        <div className="col-xs-6 col-sm-4 full-height media-player-buttons">
          <button className="media-player-btn">
            <span className="fa fa-step-backward"></span>
          </button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <button 
              className="media-player-btn"
              onClick={this.pause}
          >
            <span className={playBtnClass}></span>
          </button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <button
              className="media-player-btn"
              onClick={this.nextSong}
          >
            <span className="fa fa-step-forward"></span>
          </button>
        </div>

        <div className="col-xs-6 col-sm-4 full-height media-player-song">
          <span className="media-player-song-title">{songName}</span><br/>
          <span className="media-player-song-album">{albumName}</span>
        </div>

        <div className="col-sm-4 hidden-xs full-height media-player-cover">
          <img
              src={coverUrl}
              alt=""
              height="50px"
              width="50px"
          />
        </div>
      </div>
    )
  },

  initPlayerConfiguration() {
    if (this.state.currentSongUrl) {
      var audioPlayer = document.getElementById('audioPlayer1')
      if (this.state.playing) {

        if (this.state.playingFromStart) {
          audioPlayer.src = this.state.currentSongUrl
          audioPlayer.play()
        }
        else {
          audioPlayer.play()
        }
      }
      else {
        audioPlayer.pause()
      }
    }
  },
  
  nextSong() {
    if (this.state.nextSong) {
      mediaPlayerActions.nextSong()

      var itemId  = this.state.nextSong.song.fileId
      var oDEmail = this.state.nextSong.song.ownerInfo.ODEmail
      oDServerActions.itemContentUrl(itemId, oDEmail)
    }
  },
  
  pause() {
    mediaPlayerActions.playPause()
  },

  _onChange() {
    this.setState(getState())
  }
})

module.exports = MediaPlayer