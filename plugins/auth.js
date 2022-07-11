// import jwtDecode from 'jwt-decode'
export default function ({ $cookies, $dayjs, $axios, app }) {
  $axios.onRequest((config) => {
    if (app.$auth.loggedIn && $cookies.get('auth._token.local')) {
      if (new Date() >= new Date($cookies.get('auth').expired_at)) {
        app.$auth.strategy.token.reset()
        // app.$auth.logout()
        if (process.client) {
          window.location.reload()
        }
        app.$auth.strategy.token.reset()
        $cookies.remove('auth')
        $cookies.remove('auth._user')
      }
    }
  })
  $axios.onResponse((config) => {
  })
  $axios.onError((error) => {
    // const code = parseInt(error.response.status)
    if (app.$auth.loggedIn && $cookies.get('auth._token.local')) {
      // console.log(error.response)
      if (error.response && error.response.statusText === 'Unauthorized') {
        app.$auth.strategy.token.reset()
        app.$auth.logout()
        if (process.client) {
          window.location.reload()
        }
        app.$auth.strategy.token.reset()
        $cookies.remove('auth')
        $cookies.remove('auth._user')
      }
    }
  })
}
