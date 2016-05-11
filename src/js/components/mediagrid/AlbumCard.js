
var React = require('react')
var spotifyService = require('../../services/SpotifyService')
var oDLibraryActions = require('../../actions/ODLibraryActions')

var AlbumCard = React.createClass({
  
  getInitialState() {
    return {
      coverUrl: ''
    }
  },
  
  componentDidMount() {
    var self = this
    var artist = this.props.artist
    var title  = this.props.title

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
  
  render() {
    var coverUrl = this.state.coverUrl
        ? this.state.coverUrl
        : this.props.coverUrl

    return (
      <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2 text-center album-card">
        <div
              className="album-card-cover-container"
              onClick={oDLibraryActions.viewAlbum.bind(null, this.props.albumId)}>
          <img
            className="album-card-cover"
            src={coverUrl}
            alt=""
            width="80%"
          />
        </div>

        <span className="album-card-title">{this.props.title}</span>
        <br/>
        <span className="album-card-artist">{this.props.artist}</span>
      </div>
    )
  },

  updateCoverUrl(coverUrl) {
    this.setState({
      coverUrl: coverUrl
    })
  }
})

module.exports = AlbumCard