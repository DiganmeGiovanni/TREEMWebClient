
module.exports = {

  apiUrls: {
    USER_OD_CODE_LOGIN: 'http://treem.appspot.com/api/od/codelogin'
  },

  actionTypes: {

    USER_LOGIN: 'action-user-login',
    USER_LOGOUT: 'action-user-logout',

    USER_OD_LOGIN: 'action-user-onedrive-login',
    USER_OD_CODE_LOGIN: 'action-user-onedrive-code-login',

    VIEW_GO_TO_VIEW: 'action-view-go-to-view'
  },

  //
  // In-memory user data
  user: {
    fullName: '',
    email: ''
  }
}