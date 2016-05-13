
module.exports = {

  apiUrls: {
    USER_OD_CODE_LOGIN: 'http://treem.appspot.com/api/od/codelogin',

    OD_ACCOUNTS: 'http://treem.appspot.com/api/od/accounts',
    OD_CHILDREN: 'http://treem.appspot.com/api/od/children',
    OD_ITEM_FETCH_CONTENT_URL: 'http://treem.appspot.com/api/od/itemcontentsurl',
    OD_LIBRARIES:'http://treem.appspot.com/api/od/libraries',
    OD_LIBRARY: 'http://treem.appspot.com/api/od/library',
    OD_SCAN_LIBS: 'http://treem.appspot.com/api/od/scanlibs',
    OD_SCAN_STATUS: 'http://treem.appspot.com/api/od/scanstatus',
    OD_MCOLLECTION: 'http://treem.appspot.com/api/od/mcollection',
    OD_FETCH_ALBUM_COVER: 'http://treem.appspot.com/api/od/albumcoverurl',

    SPOTIFY_SEARCH: 'https://api.spotify.com/v1/search'
  },

  actionTypes: {
    api: {
      OD_FETCH_ACCOUNTS: 'action-od-fetch-accounts',
      OD_FETCH_CHILDREN: 'action-od-fetch-children',
      OD_FETCH_LIBRARIES:'action-od-fetch-libraries',
      OD_FETCH_MCOLLECTION: 'action-od-fetch-mcollection',

      OD_ITEM_FETCH_CONTENT_URL: 'action-od-content-url',
      OD_ITEM_RECEIVE_CONTENT_URL: 'action-od-content-url',

      OD_CREATE_LIBRARY: 'action-od-create-library',

      OD_RECEIVE_ACCOUNTS: 'action-od-receive-accounts',
      OD_RECEIVE_CHILDREN: 'action-od-receive-children',
      OD_RECEIVE_LIBRARIES:'action-od-receive-libraries',
      OD_RECEIVE_MCOLLECTION: 'action-od-receive-mcollection',
      OD_SCAN_LIBRARIES: 'action-od-scan-libraries',
      OD_SCAN_STARTED: 'action-od-scan-started',
      OD_SCAN_STATUS: 'action-od-scan-started',
      OD_SCAN_FINISHED: 'action-od-scan-finished'
    },

    MEDIA_PLAYER_QUEUE_SONG: 'action-media-player-queue-song',
    MEDIA_PLAYER_QUEUE_ALBUM: 'action-media-player-queue-album',
    MEDIA_PLAYER_QUEUE_PLAY_SONG: 'action-media-player-queue-play-song',
    MEDIA_PLAYER_QUEUE_PLAY_ALBUM: 'action-media-player-queue-play-album',
    MEDIA_PLAYER_NEXT_SONG: 'action-media-player-next',
    MEDIA_PLAYER_PREV_SONG: 'action-media-player-prev',
    MEDIA_PLAYER_PLAY_PAUSE: 'action-media-player-play-playPause',

    OD_LIBRARY_VIEW_ALBUM: 'action-od-library-view-album',
    OD_LIBRARY_VIEW_GRID: 'action-od-library-view-grid',

    USER_LOGIN: 'action-user-login',
    USER_LOGOUT: 'action-user-logout',
    USER_RESULT: 'action-user-receive',

    USER_OD_LOGIN: 'action-user-onedrive-login',
    USER_OD_CODE_LOGIN: 'action-user-onedrive-code-login',


    VIEW_GO_TO_VIEW: 'action-view-go-to-view'
  },

}