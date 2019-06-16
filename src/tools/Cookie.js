import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'; //Token键
const RoleKey = 0;              //role键
// 从cookie中获取ToKen
export function cookieGetToken() {
    return Cookies.get(TokenKey)
}
// 在cookie中设置ToKen
export function cookieSetToken(token) {
    return Cookies.set(TokenKey, token)
}
// 从cookie中删除ToKen
export function cookieRemoveToken() {
    return Cookies.remove(TokenKey)
}
// 从cookie中获取role
export function cookieGetRole() {
    return Cookies.get(RoleKey)
}
// 在cookie中设置role
export function cookieSetRole(Role) {
    return Cookies.set(RoleKey, Role)
}
// 从cookie中删除role
export function cookieRemoveRole() {
    return Cookies.remove(RoleKey)
}

