export default function ({ store, app, redirect }) {
  if (app.$auth.loggedIn && app.$cookies.get('auth._token.local')) {
    return redirect('/dashboard')
  }

  return false
}
