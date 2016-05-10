
var React = require('react')
var oDLibraryStore = require('../../stores/ODLibraryStore')
var oDServerActions = require('../../actions/ODServerActions')

function getState() {
  return {
    oDMCollection: oDLibraryStore.getODMCollection(),
    oDLibFetchTries: oDLibraryStore.getODLibFetchTries()
  }
}

var ODLibrary = React.createClass({
  
  getInitialState() {
    return getState()
  },

  componentDidMount() {
    oDLibraryStore.addChangeListener(this._onChange)
    oDServerActions.fetchODMCollection('giovanni_fi05@live.com')
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
      var mediaContents = this.constructMediagrid()
      return (
        <div className="media-grid">
          <div className="row">
            {mediaContents}
          </div>
        </div>
      )
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
          <div className="col-xs-6">
            <h5>{artist.name}</h5>
            <h5>{album.title}</h5>
          </div>
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