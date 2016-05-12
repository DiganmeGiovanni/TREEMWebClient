
var React = require('react')

var mediaPlayerStore = require('../stores/MediaPlayerStore')
var mediaPlayerActions = require('../actions/MediaPlayerActions')
var oDServerActions    = require('../actions/ODServerActions')

const audioPlayer1 = document.createElement('audio')
audioPlayer1.class = "hidden"
audioPlayer1.id    = "audioPlayer1"
audioPlayer1.addEventListener("ended", function() {
  audioPlayer1.currentTime = 0
  mediaPlayerActions.nextSong()
})

function getState() {
  return {
    queue: mediaPlayerStore.getQueue(),
    currentIndex: mediaPlayerStore.getCurrentIndex(),
    playbackPaused: mediaPlayerStore.getPlaybackPaused(),
    skipToCurrent: mediaPlayerStore.getSkipToCurrent()
  }
}

var MediaPlayer = React.createClass({

  getInitialState() {
    return getState()
  },

  componentDidMount() {
    mediaPlayerStore.addChangeListener(this._onChange)

    $('body').append(audioPlayer1)
  },

  componentWillUnmount() {
    mediaPlayerStore.removeChangeListener(this._onChange)
    $('#audioPlayer1').remove()
  },

  render() {
    this.updatePlayerStatus()

    var currentSong = this.state.queue[this.state.currentIndex]
    if (currentSong) {
      var albumName = currentSong.albumName
      var songName  = currentSong.song.title
      var coverUrl  = currentSong.coverUrl
    }
    else {
      var albumName = "- -"
      var songName  = "- - - -"
      var coverUrl  = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAgAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQQFBgIDB//EAC4QAAICAQIFAwQCAQUAAAAAAAABAgMRBDEFEyFBURIicTNhgaEy0SMUUpGxwf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD4aAAAAA0svACHgstJwqyz3Xvlx8dy0o0lFH04LPl9WBnq9NfZ/CqT/B7x4Xq2s8tL5kjQ7CyBn3wvVpfTT+JI8LNLfX1nVJLzg1AP5YGSwI092j096/yVrPldGVer4TZXl0PmR8dwKwBtYeBAAAAAADSb2A6rrlbNQgsyfYvtBw+GmXql7rHu/HwHDdGtNX6p9bZbvwvBNyAmMBdwGGADICH8i2BgMSGmDAha/QQ1K9Ufbatn2fyUNlcq5uE1iSeGjVohcS0a1NXqh0tjs/K8AZ4BtNbiACz4NpeZa7Zr2w6LPkrVuaXR08jTQr74y/lgSMIMAGQAXcGADExTnGtN2SUUt2+xH/1alnlU22Lyo4X7AlCZG/1np+rTZWl3cc/9MkQlGcVKElJPZoBjYCAaGJABScY0vLtVsF7Z9H8lYabWU8/TWV98ZXyZpgeujr5uqrg+8jT4M/whZ19f2Tf6NBsA/sLAwYCwKclXFzm8Rist+DpEbWr1cqrdWTSf4ywOaKne1fqM53hB7RX9kr7LbwNtfjBT8S110dQ6qpOCh0bXdgW68Z/4It1T08nfplh7zgtpL+yDwzX3SvjTbJzU+ib7MuV17dO4HNco2QUoPMZLKfk6SI2i9nNrb6V2NL84ZJYA0IaDACX3MxrIcvU2QWyl0NQ0Z7i6xrp/dJ/oA4Q8a6H3TX6NCmZfSWcvU1zeykadgPICwPcAI2t9qqsx0rsWfh5X/pJObIxnCUZdYyWGvIHW+cPo9ip4lw+yy53UrPq3Xgl0WuhqjUdMdIWPaS/slr/ctgKnhnD7a7ldd7fTtHyWy6YzsGemXt5Il1rvk6NO/tOxbRX9gdaH3c6zdTsbXwuhIFCMYQjGHSMVhfA0AAPAgHkz3F2nr547JL9GgX32Mxq58zU2T8yA8kaXR3c/S1z74w/kzJZ8H1XLtdU/4z6r5AuwGIAYg3H2A5nGFicZxUk90zwWj9OeTdbWvCllftElABGekjL6t1tn2csL9I94QjCKjCKjFbJbI6SAAEh4E2AMO4AtwPHW3KjSzn3xhfJmXuWXGNVzLVVH+MN/krAAabWwgA0XDdYtTV6Z9LY7ryvJMMpVZKqanB4ktmX2g4hXqEoy9tq3XZ/AE0BMAGAZDICyGQQwATQwfVAJIh8S1i01fpg82S2XhBrdfXpouMfda9l2XyUNlkrJynNtye7A5bz1YgAAAAABp4eUIALPScVsr9ty5kfK3LOnV0X/AE7Fnw+jMyPIGswwwZivU31/wtkvye8eKatLHMT+YoDQ5Bp74M8+Katr6iXxFHhZqb7P52yf5A0N2s09C/yWLPhdWVer4rZZ7aE64+e5W5EA28vIgAAAAA//2Q=="
    }

    var playBtnClass = "fa fa-play"
    if (!audioPlayer1.paused) {

      if (this.state.skipToCurrent && !currentSong.contentUrl) {
        playBtnClass = "fa fa-spinner fa-spin fa-fw"
      }
      else {
        playBtnClass = "fa fa-pause"
      }
    }

    return (
      <div className="media-player text-center">

        <div className="col-xs-6 col-sm-4 full-height media-player-buttons">

          {/* Previous song button */}
          <button
            className="media-player-btn"
            onClick={this.prevSong}>
            <span className="fa fa-step-backward"></span>
          </button>
          <span>&nbsp;&nbsp;&nbsp;</span>

          {/* Play/Pause button */}
          <button 
            className="media-player-btn"
            onClick={this.playPause} >
            <span className={playBtnClass}></span>
          </button>
          <span>&nbsp;&nbsp;&nbsp;</span>

          {/* Next song button */}
          <button
            className="media-player-btn"
            onClick={this.nextSong} >
            <span className="fa fa-step-forward"></span>
          </button>
          <span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span>

          {/* Next song button */}
          <button
            className="media-player-btn"
            onClick={this.viewPlaylist} >
            <span className="fa fa-list"></span>
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

  updatePlayerStatus() {
    var currentSong = this.state.queue[this.state.currentIndex]

    if (this.state.skipToCurrent) {
      if (currentSong.contentUrl) {
        audioPlayer1.src = currentSong.contentUrl
        audioPlayer1.play()
      }
    }

    if (this.state.playbackPaused) {
      audioPlayer1.pause()
    }
    else if (currentSong.contentUrl) {
      audioPlayer1.play()
    }
  },
  
  nextSong() {
    mediaPlayerActions.nextSong()
  },
  
  playPause() {
    mediaPlayerActions.playPause()
  },

  prevSong() {
    mediaPlayerActions.prevSong()
  },

  viewPlaylist() {
    for (var i = 0; i < this.state.queue.length; i++) {
      var currentSong = this.state.queue[i]
      console.log(currentSong.artistName + " - " + currentSong.song.title)
    }
  },

  _onChange() {
    this.setState(getState())
  }
})

module.exports = MediaPlayer