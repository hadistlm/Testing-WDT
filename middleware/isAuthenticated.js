export default function ({ store, app, redirect, route }) {
  // Force logout when state still logged in but token has expired
  if (
    app.$auth.loggedIn &&
    !app.$cookies.get('auth._token.local') &&
    !app.$cookies.get('auth')
  ) {
    app.$auth.logout()
    return false
  } else if (
    app.$auth.loggedIn &&
    app.$cookies.get('auth').user.role_id !== 1 &&
    route.path.includes('/admin')
  ) {
    return redirect('/dashboard')
  } else {
    return true
  }
}
