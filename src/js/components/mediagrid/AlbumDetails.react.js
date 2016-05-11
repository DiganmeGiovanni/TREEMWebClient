
var React = require('react')
var spotifyService = require('../../services/SpotifyService')
var oDLibraryActions = require('../../actions/ODLibraryActions')
var mediaPlayerActions = require('../../actions/MediaPlayerActions')
var mediaPlayerServerActions = require('../../actions/MediaPlayerServerActions')

var AlbumDetails = React.createClass({

  getInitialState() {
    return {
      coverUrl: ''
    }
  },

  componentDidMount() {
    this.fetchAlbumCover()
  },
  
  render() {
    var album    = this.props.album
    var artist   = this.props.artist
    var songs    = this.props.album.songs
    var coverUrl = this.state.coverUrl
      ? this.state.coverUrl
      : this.props.album.coverUrl

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

          <button className="btn btn-default">
            <span className="fa fa-play"></span>
            <span>&nbsp;&nbsp;Play now</span>
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-default">
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

  fetchAlbumCover() {
    var self = this

    var artist = this.props.album.artist
    var title  = this.props.album.title

    spotifyService.searchAlbum(artist, title, function (err, results) {
      if (!err) {
        var items = results.albums.items
        if (items && items[0]) {
          var coverUrl = items[0].images[1].url
          self.updateCoverUrl(coverUrl)
        }
      }
      else {
        console.error(err)
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
  }
})

module.exports = AlbumDetails