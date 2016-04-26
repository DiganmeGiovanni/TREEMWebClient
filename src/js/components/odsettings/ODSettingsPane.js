/**
 * Created by giovanni on 4/24/16.
 *
 */

var React = require('react')

var ODSettingsPane = React.createClass({
  
  // Required props:
  // title
  // topBarButton
  // paneBody
  
  render() {
    return (
      <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
        <div className="panel panel-default settings-panel">
          <div className="panel-heading">
            <div className="panel-title">
              {this.props.title}
              {this.props.topBarButton}
            </div>
          </div>

          <div className="panel-body">
            {this.props.paneBody}
          </div>
        </div>
      </div>
    )
  },

})

module.exports = ODSettingsPane