
var React = require('react')

var UserStore         = require('../../stores/UserStore')
var oDSettingsStore   = require('../../stores/ODSettingsStore')
var ODSettingsActions = require('../../actions/ODSettingsActions')
var oDServerActions   = require('../../actions/ODServerActions')
var ODSettingsPane = require('./ODSettingsPane')


function getState() {
  return {
    displaying: oDSettingsStore.getDisplayingPane(),
    oDAccounts: oDSettingsStore.getODAccounts(),
    oDAccountsFetchTries: oDSettingsStore.getODAccountsFetchTries(),
    oDLibrariesOwner: oDSettingsStore.getLibrariesOwner(),
    oDLibraries: oDSettingsStore.getODLibraries(),
    oDLibrariesFetchTries: oDSettingsStore.getODLibrariesFetchTries(),

    currentFolder: oDSettingsStore.getCurrentFolder(),
    foldersNavHistory: oDSettingsStore.getFoldersNavHistory(),
    subFolders: oDSettingsStore.getSubFolders(),
    subFoldersFetchTries: oDSettingsStore.getSubFoldersFetchTries(),
  }
}

var ODSettings = React.createClass({

  getInitialState() {
    return getState()
  },

  componentDidMount() {
    oDSettingsStore.addChangeListener(this._onChange)
    if (this.state.oDAccountsFetchTries == 0) {
      ODSettingsActions.apiFetchAccounts()
    }
  },

  componentWillUnmount() {
    oDSettingsStore.removeChangeListener(this._onChange)
  },

  render() {
    var settingsPane = this._constructSettingsPane()

    return (
      <div className="settings">
        <div className="col-xs-12 no-padding text-center">
          <h2>OneDrive Preferences</h2>
          <br/>
        </div>
        {settingsPane}
      </div>
    )
  },

  _fetchAccountFolders(oDEmail) {
    ODSettingsActions.apiFetchChildren(oDEmail, 'folder')
  },

  _fetchAccountLibraries(oDEmail) {
    ODSettingsActions.apiFetchLibraries(oDEmail)
  },

  _fetchFolderChildren(folderId) {
    ODSettingsActions.apiFetchChildren(this.state.oDLibrariesOwner, 'folder', folderId)
  },
  
  _createODLibrary(folderId, folderName, e) {
    e.stopPropagation()

    ODSettingsActions.createODLibrary(
      folderId,
      folderName,
      this.state.oDLibrariesOwner
    )
  },

  _constructSettingsPane() {
    if (this.state.displaying === 'od-accounts') {
      return this._constructsODAccountsPane()
    }
    else if (this.state.displaying === 'od-folders') {
      return this._constructODFoldersPane()
    }
    else if (this.state.displaying === 'od-libraries') {
      return this._constructODLibrariesPane()
    }
    else if (this.state.displaying == 'od-scanning') {
      return this._constructODScanningPane()
    }
  },

  _constructODFoldersPane() {
    var settingsPaneBody

    if (this.state.subFoldersFetchTries == 0) {
      settingsPaneBody = (
        <div className="col-xs-12 text-center">
          <h2 className="fa fa-cog fa-spin fa-3x fa-fw"></h2>
          <h5>Loading OneDrive sub folders</h5>
        </div>
      )
    }
    else {
      var foldersListItems = []

      if (this.state.foldersNavHistory.length > 0) {
        var parentId = null
        if (this.state.foldersNavHistory.length > 1) {
          parentId = this.state.foldersNavHistory[this.state.foldersNavHistory.length - 2]
        }
        
        foldersListItems.push(
          <button
            className="list-group-item"
            key={i}
            onClick={this._fetchFolderChildren.bind(null, parentId)}
            type="button"
          >
            <span className="fa fa-angle-left"></span>
            <span>&nbsp;&nbsp;Go back</span>
          </button>
        )
      }

      for (var i=0; i < this.state.subFolders.length; i++) {
        var subFolder = this.state.subFolders[i]

        if (subFolder.isTREEMLibrary) {
          foldersListItems.push(
            <div className="list-group-item disabled" key={i} type="button">
              <div className="row">
                <div className="col-xs-10">
                  <span>{subFolder.name}</span>
                  <span>&nbsp;&nbsp;</span>
                  <span className="label label-success">TREEM Library</span>
                </div>
              </div>
            </div>
          )
        }
        else {
          foldersListItems.push(
            <div
              className="list-group-item clickable"
              key={i}
              onClick={this._fetchFolderChildren.bind(null, subFolder.id)}
              type="button"
            >
              <div className="row">
                <div className="col-xs-10">
                  <span>{subFolder.name}</span>
                </div>

                <div className="col-xs-2 no-padding">
                  <div className="dropdown">
                    <button
                      className="btn btn-default pull-right btn-clean"
                      style={{'paddingTop': '0px', 'paddingBottom': '0px', 'paddingLeft': '10px', 'paddingRight': '10px'}}
                      onClick={this._noPropagate}
                      data-toggle="dropdown">
                      <span className="fa fa-ellipsis-v"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li>
                        <a
                          href="#"
                          onClick={
                            this._createODLibrary.bind(
                              null,
                              subFolder.id,
                              subFolder.name
                            )
                          }
                        >
                          Add to library
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      }

      settingsPaneBody = (
        <div className="list-group">
          {foldersListItems}
        </div>
      )
    }

    var headerButtons = (
      <div className="pull-right">
        <button
          className="btn btn-default btn-clean pull-right"
          onClick={this._fetchFolderChildren.bind(null, null)}>
          <span className="fa fa-home"></span>
        </button>
        <button
          className="btn btn-default btn-clean pull-right"
          onClick={ODSettingsActions.apiFetchAccounts}>
          <span className="fa fa-users"></span>
        </button>
      </div>
    )

    return (
      <ODSettingsPane
          paneBody={settingsPaneBody}
          title="Account folders"
          topBarButton={headerButtons}
      />
    )
  },

  _constructsODAccountsPane() {
    var settingsPaneBody = ''
    if (this.state.oDAccountsFetchTries > 0 && this.state.oDAccounts.length == 0) {
      settingsPaneBody = (
        <div className="col-xs-12 text-center">
          <h2 className="fa fa-cog fa-spin fa-3x fa-fw"></h2>
          <h5>It seems that you don't have OneDrive accounts connected</h5>
          <button className="btn btn-default">
            <span className="fa fa-plus"></span>
            <span>&nbsp;&nbsp; Connect an account</span>
          </button>
        </div>
      )
    }
    else if (this.state.oDAccountsFetchTries == 0) {
      settingsPaneBody = (
        <div className="col-xs-12 text-center">
          <h2 className="fa fa-cog fa-spin fa-3x fa-fw"></h2>
          <h5>Loading OneDrive accounts</h5>
        </div>
      )
    }
    else {
      var accountsListItems = []
      for (var i=0; i< this.state.oDAccounts.length; i++) {
        accountsListItems.push(
          <button
              className="list-group-item"
              key={i}
              onClick={this._fetchAccountLibraries.bind(null, this.state.oDAccounts[i])}
              type="button">
            {this.state.oDAccounts[i]}
          </button>
        )
      }

      settingsPaneBody = (
        <div>
          <div className="list-group">
            {accountsListItems}
          </div>
          <div className="list-group">
            <div className="list-group-item text-center clickable sutil">
              <span>Add another account</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <ODSettingsPane
          paneBody={settingsPaneBody}
          title="Connected accounts"
          topBarButton=''
      />
    )
  },

  _constructODLibrariesPane() {
      var settingsPaneBody = ''
      if (this.state.oDLibrariesFetchTries > 0 && this.state.oDLibraries.length == 0) {
        settingsPaneBody = (
          <div className="col-xs-12 text-center">
            <h2 className="fa fa-3x fa-cubes"></h2>
            <h5>It seems that you don't have OneDrive libraries</h5>
            <button
                className="btn btn-default"
                onClick={this._fetchAccountFolders.bind(null, this.state.oDLibrariesOwner)}
            >
              <span className="fa fa-plus"></span>
              <span>&nbsp;&nbsp; Add a folder as library</span>
            </button>
          </div>
        )
      }
      else if (this.state.oDLibrariesFetchTries == 0) {
        settingsPaneBody = (
          <div className="col-xs-12 text-center">
            <h2 className="fa fa-cog fa-spin fa-3x fa-fw"></h2>
            <h5>Loading OneDrive libraries</h5>
          </div>
        )
      }
      else {
        var librariesListItems = []
        for (var i=0; i< this.state.oDLibraries.length; i++) {
          librariesListItems.push(
            <button
              className="list-group-item"
              key={i}
              type="button">
              <span className="fa fa-music"></span>
              <span>&nbsp;&nbsp;</span>
              <span>{this.state.oDLibraries[i].folderName}</span>
            </button>
          )
        }

        settingsPaneBody = (
          <div>
            <div className="list-group">
              {librariesListItems}
            </div>
            <div className="list-group">
              <div 
                  className="list-group-item text-center clickable sutil"
                  onClick={this._fetchAccountFolders.bind(null, this.state.oDLibrariesOwner)}
              >
                <span>Add another library</span>
              </div>
            </div>
          </div>
        )
      }

    var topBarBtn = (
      <div className="pull-right">
        <button 
            className="btn btn-default btn-clean"
            onClick={oDServerActions.scanLibraries.bind(null, UserStore.getUserEmail())}>
          <span className="fa fa-music"></span>
        </button>
        <button
            className="btn btn-default btn-clean pull-right"
            onClick={ODSettingsActions.apiFetchAccounts}>
          <span className="fa fa-users"></span>
        </button>
      </div>
    )

      return (
        <ODSettingsPane
          paneBody={settingsPaneBody}
          title="OneDrive Media libraries"
          topBarButton={topBarBtn}
        />
      )
  },

  _constructODScanningPane() {
    var scanningPaneBody = (
      <div className="col-xs-12 text-center">
        <h2 className="fa fa-cog fa-spin fa-3x fa-fw"></h2>
        <h5>Scanning your OneDrive libraries</h5>
      </div>
    )

    return (
      <ODSettingsPane
        paneBody={scanningPaneBody}
        title="Background libraries scanning"
        topBarButton=""
      />
    )
  },

  _noPropagate(e) {
    e.stopPropagation()
  },

  _onChange: function () {
    this.setState(getState())
  }
})


module.exports = ODSettings