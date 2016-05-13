
var React = require('react')

var oDService = require('../../services/ODService')
var oDLibraryActions = require('../../actions/ODLibraryActions')
var mediaPlayerActions = require('../../actions/MediaPlayerActions')
var mediaPlayerServerActions = require('../../actions/MediaPlayerServerActions')

var AlbumDetails = React.createClass({

  getInitialState() {
    return {
      coverUrl: 'http://bobjames.com/wp-content/themes/soundcheck/images/default-album-artwork.png'
    }
  },

  componentDidMount() {
    this.requestCoverUrl()
  },
  
  render() {
    var album    = this.props.album
    var artist   = this.props.artist
    var songs    = this.props.album.songs
    var coverUrl = this.state.coverUrl

    var songsJSX = this.constructsSongs(songs)

    return (
      <div className="album-details full-height">
        <div className="col-xs-12 text-left">
          <button
              className="btn btn-default"
              onClick={oDLibraryActions.viewGrid}
          >
            <span className="fa fa-th"></span>
            <span>&nbsp;&nbsp;All albums</span>
          </button>
        </div>
        <div className="col-sm-5 text-center album-details-cover">
          <div className="hidden-xs">
            <br/><br/>
          </div>

          <img
            className="album-card-cover"
            src={coverUrl}
            alt=""
            width="75%"
          />
          <h4>{album.title}</h4>
          <h5>{artist.name}</h5>

          <button
            className="btn btn-default"
            onClick={this.queuePlayAlbum}
          >
            <span className="fa fa-play"></span>
            <span>&nbsp;&nbsp;Play now</span>
          </button>
          &nbsp;&nbsp;
          <button
            className="btn btn-default"
            onClick={this.queueAlbum}
          >
            <span className="fa fa-clock-o"></span>
            <span>&nbsp;&nbsp;Queue</span>
          </button>
        </div>

        <div className="col-sm-7 text-center album-details-songs">
          <br/><br/><br/>
          {songsJSX}
        </div>
      </div>
    )
  },

  constructsSongs(songs) {
    var songsJSX = []
    for (var i=0; i < songs.length; i++) {
      var artistName = this.props.artist.name
      var albumName  = this.props.album.title
      var song       = songs[i]
      var coverUrl = this.state.coverUrl
        ? this.state.coverUrl
        : this.props.album.coverUrl

      songsJSX.push(
        <div key={'album-details-song-' + i} className="album-details-song text-left">
          <button 
              className="btn btn-default btn-clean"
              onClick={this.queueSong.bind(null, artistName, albumName, coverUrl, song)}
          >
            <span className="fa fa-clock-o"></span>
          </button>
          
          &nbsp;&nbsp;
          <button
              className="btn btn-default btn-clean"
              onClick={this.queuePlaySong.bind(null, artistName, albumName, coverUrl, song)}
          >
            <span className="fa fa-play"></span>
          </button>
          
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="album-details-song-name">
            {songs[i].title}
          </span>
        </div>
      )
    }

    return songsJSX
  },

  requestCoverUrl() {
    var self = this

    var album      = this.props.album
    var albumTitle = album.title
    var artistName = this.props.artist.name
    var fileId     = album.songs[0].fileId
    var oDEmail    = album.songs[0].ownerInfo.ODEmail

    oDService.fetchCoverUrl(oDEmail, albumTitle, artistName, fileId, function (err, coverUrl) {
      if (!err) {
        self.updateCoverUrl(coverUrl)
      }
    })
  },

  updateCoverUrl(coverUrl) {
    this.setState({
      coverUrl: coverUrl
    })
  },

  queueSong(artistName, albumName, coverUrl, song) {
    mediaPlayerActions.queueSong(artistName, albumName, coverUrl, song)
  },
  
  queuePlaySong(artistName, albumName, coverUrl, song) {
    mediaPlayerServerActions.queuePlaySong(artistName, albumName, coverUrl, song)
  },

  queueAlbum() {
    var artistName = this.props.artist.name
    var albumName  = this.props.album.title
    var coverUrl   = this.props.album.coverUrl
    var songs      = this.props.album.songs

    for (var i = 0; i < songs.length; i++) {
      this.queueSong(artistName, albumName, coverUrl, songs[i])
    }
  },

  queuePlayAlbum() {
    var artistName = this.props.artist.name
    var albumName  = this.props.album.title
    var coverUrl   = this.props.album.coverUrl
    var songs      = this.props.album.songs

    // Queue and play the first track only
    this.queuePlaySong(artistName, albumName, coverUrl, songs[0])

    for (var i = 1; i < songs.length; i++) {
      this.queueSong(artistName, albumName, coverUrl, songs[i])
    }
  },
})

module.exports = AlbumDetails