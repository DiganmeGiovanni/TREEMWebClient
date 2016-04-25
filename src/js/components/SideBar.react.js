
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
            Now Playing
          </a>
          <a
            href="#"
            onClick={this._goToView.bind(null, 'media-library')}
            className={
              (this.props.currentView === 'media-library')
                  ? "menu-group-item menu-group-item-active"
                  : "menu-group-item"
            }>
            Media Library
          </a>

        </div>
        <div className="menu-group">
          <div className="menu-group-header">MEDIA SOURCES</div>
          <a
            href="#"
            onClick={this._goToView.bind(null, 'oneDrive')}
            className={
              (this.props.currentView === 'oneDrive')
                  ? "menu-group-item menu-group-item-active"
                  : "menu-group-item"
            }>
            OneDrive
          </a>
          <a
            href="#"
            onClick={this._goToView.bind(null, 'googleDrive')}
            className={
              (this.props.currentView === 'googleDrive')
                  ? "menu-group-item menu-group-item-active"
                  : "menu-group-item"
            }>
            Google Drive
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