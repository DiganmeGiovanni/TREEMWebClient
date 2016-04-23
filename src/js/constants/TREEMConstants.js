
module.exports = {

  apiUrls: {
    USER_OD_CODE_LOGIN: 'http://treem.appspot.com/api/od/codelogin'
  },

  actionTypes: {

    USER_LOGIN: 'action-user-login',
    USER_LOGOUT: 'action-user-logout',

    USER_OD_LOGIN: 'action-user-onedrive-login',
    USER_OD_CODE_LOGIN: 'action-user-onedrive-code-login'
  },

  //
  // In-memory user data
  user: {
    fullName: '',
    email: ''
  }
}