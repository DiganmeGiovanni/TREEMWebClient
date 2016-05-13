
var React = require('react')
var oDService = require('../../services/ODService')
var oDLibraryActions = require('../../actions/ODLibraryActions')

var AlbumCard = React.createClass({
  
  getInitialState() {
    return {
      coverUrl: 'http://bobjames.com/wp-content/themes/soundcheck/images/default-album-artwork.png'
    }
  },
  
  componentDidMount() {

    this.requestCoverUrl()
  },
  
  render() {
    var coverUrl = this.state.coverUrl

    return (
      <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2 text-center album-card">
        <div
              className="album-card-cover-container"
              onClick={oDLibraryActions.viewAlbum.bind(null, this.props.album._id)}>
          <img
            className="album-card-cover"
            src={coverUrl}
            alt=""
            width="80%"
          />
        </div>

        <span className="album-card-title">{this.props.album.title}</span>
        <br/>
        <span className="album-card-artist">{this.props.artistName}</span>
      </div>
    )
  },
  
  requestCoverUrl() {
    var self = this
    
    var album      = this.props.album
    var albumTitle = album.title
    var artistName = this.props.artistName
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
  }
})

module.exports = AlbumCard