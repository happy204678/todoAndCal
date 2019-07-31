
import * as types from './mutation-types'
import store from 'storejs'

export const setUserName = ({ commit }, value) => {
  let array = store.get('userName') !== undefined ? store.get('userName') : []
  console.log(array)
  array.push(value)
  store.set('userName', array)
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
  let array = store.get('number') !== undefined ? store.get('number') : []
  array.push(value)
  store.set('number', array)
  commit(types.SET_NUMBER, value)
}
export const setLogout = ({ commit }, value) => {
  let us = store.get('userName')
  us.splice(value)
  store.set('userName', us)

  let n = store.get('number')
  n.splice(value)
  store.set('number', n)
  commit(types.SET_LOGOUT, value)
}

// export const setUserVerify = ({ commit }, value) => {
//   store.set('userVerify', value)
//   commit(types.SET_USERVERIFY, value)
// }
