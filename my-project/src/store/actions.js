
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
export const setLogout = ({ commit }, value) => {
  let us = store.get('userName')
  us.splice(value, 1)
  store.set('userName', us)

  commit(types.SET_LOGOUT, value)
}
export const getData = ({ commit }) => {
  // console.log('instore', store.get('userName'))

  commit(types.GET_DATA)
  let data = {
    userName: store.get('userName')
  }
  return data
}

// export const setUserVerify = ({ commit }, value) => {
//   store.set('userVerify', value)
//   commit(types.SET_USERVERIFY, value)
// }
