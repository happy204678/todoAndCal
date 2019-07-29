
import * as types from './mutation-types'
import store from 'storejs'

export const setUserName = ({ commit }, value) => {
  // store.set('userName', value)
  commit(types.SET_USERNAME, value)
}
export const setIdentify = ({ commit }, value) => {
  commit(types.SET_IDENTIFY, value)
}
export const setIp = ({ commit }, value) => {
  commit(types.SET_IP, value)
}
export const setPlayGame = ({ commit }, value) => {
  commit(types.SET_PLAYGAME, value)
}
export const setNumber = ({ commit }, value) => {
  store.set('number', value)
  commit(types.SET_NUMBER, value)
}
export const setLogout = ({ commit }, value) => {
  store.set('logout', value)
  commit(types.SET_LOGOUT, value)
}

// export const setUserVerify = ({ commit }, value) => {
//   store.set('userVerify', value)
//   commit(types.SET_USERVERIFY, value)
// }
