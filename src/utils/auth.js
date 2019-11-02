import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const domainVal = process.env.NODE_ENV === 'production' ? document.domain : document.domain

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    domain: domainVal
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey, {
    domain: domainVal
  })
}
