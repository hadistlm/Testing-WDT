/*
 * ===================================
 * Plugin extending Axios
 * ===================================
 * Documentation: https://axios.nuxtjs.org/
 */

export default function ({ redirect, $axios, app }) {
  $axios.onRequest((config) => {
    const c = config
    const local = app.$cookies.get('local') || null
    const uid = app.$cookies.get('uid') || null

    c.headers.AccessControlAllowOrigin = '*'
    c.headers.Accept = 'application/json, text/plain, /'
    c.headers.ContentType = 'application/json'
    // add token headers
    if (local && uid) {
      c.headers.Authorization = `Bearer ${local}`
    }
  })

  $axios.onResponse((res) => {
    if (res.status === 204) {
      res.data = {
        status: Number(res.status),
      }
    }

    return Promise.resolve(res)
  })

  $axios.onResponseError((error) => {
    if (error.response) {
      const code = parseInt(error.response.status, 10)

      // Redirect to login if Unauthorize or Forbidden
      if (code === 401 || code === 403) {
        redirect('/')
      }
    }
  })

  $axios.onError((error) => {
    if (error.response) {
      const code = parseInt(error.response.status, 10)

      // Redirect to login if Unauthorize or Forbidden
      if (code === 401 || code === 403) {
        redirect('/')
      }
    }

    return Promise.reject(error)
  })
}