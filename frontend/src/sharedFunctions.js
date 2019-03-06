const reg = key => new RegExp(`${key}=([^;]+)`)

export const getCookie = key => {
  let result = document.cookie.match(reg(key))
  if (result) result = result[1]
  if (!result) result = ''
  return result
}

export function setCookie(cname, cvalue, exp) {
  var d = new Date()
  let exdays = exp === -1 ? 365 : exp
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export const deleteCookie = key => {
  setCookie(key, '', 0)
}
