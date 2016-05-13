
var React = require('react')
var oDLibraryStore = require('../../stores/ODLibraryStore')
var UserStore      = require('../../stores/UserStore')
var oDServerActions = require('../../actions/ODServerActions')

var AlbumCard = require('./AlbumCard')
var AlbumDetails = require('./AlbumDetails.react')

function getState() {
  return {
    oDMCollection: oDLibraryStore.getODMCollection(),
    oDLibFetchTries: oDLibraryStore.getODLibFetchTries(),
    
    viewMode: oDLibraryStore.getViewMode(),
    focusedAlbumId: oDLibraryStore.getFocusedAlbumId()
  }
}

var ODLibrary = React.createClass({
  
  getInitialState() {
    return getState()
  },

  componentDidMount() {
    oDLibraryStore.addChangeListener(this._onChange)
    oDServerActions.fetchODMCollection(UserStore.getUserEmail())
  },
  
  componentWillUnmount() {
    oDLibraryStore.removeChangeListener(this._onChange)
  },
  
  render() {
    if (this.state.oDLibFetchTries === 0) {
      return (
        <div className="media-grid">
          <div className="col-xs-12 text-center">
            <h2 className="fa fa-spinner fa-spin fa-fw fa-2x"></h2>
            <h4>Fetching your OneDrive Music Collection</h4>
          </div>
        </div>
      )
    }
    else {
      var mediaContents = this._getContent()
      
      return (
        <div className="media-grid full-height">
          {mediaContents}
        </div>
      )
    }
  },
  
  _getContent() {
    if (this.state.viewMode === 'grid') {
      return this.constructMediagrid()
    }
    else if (this.state.viewMode === 'album-detail') {
      return this.constructAlbumDetail()
    }
  },
  
  constructAlbumDetail() {
    var focusedAlbumId = this.state.focusedAlbumId
    var oDMCollection = this.state.oDMCollection
    
    for (var i = 0; i < oDMCollection.artists.length; i++) {
      for (var j = 0; j < oDMCollection.artists[i].albums.length; j++) {
        var artist = oDMCollection.artists[i]
        var album = artist.albums[j]
        
        if (album._id === focusedAlbumId) {
          return (
            <AlbumDetails
                artist={artist}
                album={album}
            />    
          )
        }
      }
    }
  },
  
  constructMediagrid() {
    var oDMCollection = this.state.oDMCollection
    var albumsJSX = []
    for (var i = 0; i < oDMCollection.artists.length; i++) {
      for (var j = 0; j < oDMCollection.artists[i].albums.length; j++) {
        var artist = oDMCollection.artists[i]
        var album = artist.albums[j]
        
        albumsJSX.push(
          <AlbumCard
              key={'alb-card-' + i + '-' + j }
              album={album}
              artistName={artist.name}
          />
        )
      }
    }

    return albumsJSX
  },
  
  _onChange() {
    this.setState(getState())
  }
})

module.exports = ODLibrary