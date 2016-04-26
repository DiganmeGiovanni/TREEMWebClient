
var React = require('react')
var ViewActions = require('../actions/ViewActions')

var SideBar = React.createClass({

  render() {

    return (
      <div className="sidebar full-height ">
        <div className="menu-group">
          <a
            href="#"
            onClick={this._goToView.bind(null, 'now-playing')}
            className={
              (this.props.currentView === 'now-playing')
                  ? "menu-group-item menu-group-item-active"
                  : "menu-group-item"
            }>
            <span className="fa fa-play"></span>
            <span className="hidden-xs">&nbsp;&nbsp;Now Playing</span>
          </a>
          <a
            href="#"
            onClick={this._goToView.bind(null, 'media-library')}
            className={
              (this.props.currentView === 'media-library')
                  ? "menu-group-item menu-group-item-active"
                  : "menu-group-item"
            }>
            <span className="fa fa-cubes"></span>
            <span className="hidden-xs">&nbsp;&nbsp;Media Library</span>
          </a>

        </div>
        <div className="menu-group">
          <div className="menu-group-header hidden-xs">MEDIA SOURCES</div>
          <a
            href="#"
            onClick={this._goToView.bind(null, 'oneDrive')}
            className={
              (this.props.currentView === 'oneDrive')
                  ? "menu-group-item menu-group-item-active"
                  : "menu-group-item"
            }>
            <span className="fa fa-cloud"></span>
            <span className="hidden-xs">&nbsp;&nbsp;OneDrive</span>
          </a>
          <a
            href="#"
            onClick={this._goToView.bind(null, 'googleDrive')}
            className={
              (this.props.currentView === 'googleDrive')
                  ? "menu-group-item menu-group-item-active"
                  : "menu-group-item"
            }>
            <span className="fa fa-cloud"></span>
            <span className="hidden-xs">&nbsp;&nbsp;Google Drive</span>
          </a>

        </div>
      </div>
    )
  },

  _goToView(viewName) {
    ViewActions.goToView(viewName)
  }

})

module.exports = SideBar