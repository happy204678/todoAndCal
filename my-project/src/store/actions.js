
import * as types from './mutation-types'
import store from 'storejs'

export const setUserName = ({ commit }, value) => {
  let array = store.get('userName') !== undefined ? store.get('userName') : []
  array.push(value)
  store.set('userName', array)
  commit(types.SET_USERNAME, value)

  let array2 = store.get('playGame') !== undefined ? store.get('playGame') : [] // set not ready
  array2.push(false)
  store.set('playGame', array2)
  commit(types.SET_PLAYGAME, false)
}
export const setIdentify = ({ commit }, value) => {
  store.set('identify', value)
  commit(types.SET_IDENTIFY, value)
}
// export const setIp = ({ commit }, value) => {
//   commit(types.SET_IP, value)
// }
export const setPlayGame = ({ commit }, value) => {
  let array = store.get('playGame')
  array.splice(value, 1, !array[value])
  store.set('playGame', array)
  commit(types.SET_PLAYGAME, value)
}
export const setPlayer = ({ commit }, value) => {
  if (Array.isArray(value)) {
    store.set('player', value)
  } else {
    let array = store.get('player') !== undefined ? store.get('player') : []
    array.push(value)
    store.set('player', array)
  }
  commit(types.SET_PLAYER, value)
}
export const setPopPlayer = ({ commit }, value) => {
  let array = store.get('player')
  array.splice(value, 1)
  store.set('player', array)
  commit(types.SET_POPPLAYER, value)
}
// export const setModel = ({ commit }, value) => {
//   let array = store.get(value)
//   store.set(value, array)
//   commit(types.SET_PLAYER, value)
// }
export const setLogout = ({ commit }, value) => {
  let us = store.get('userName')
  us.splice(value, 1)
  store.set('userName', us)

  let pl = store.get('playGame')
  pl.splice(value, 1)
  store.set('playGame', pl)
  commit(types.SET_LOGOUT, value)
}
export const setGameOver = ({ commit }) => {
  store.set('player', [])
  commit(types.SET_GAMEOVER)
}
export const setSeat = ({ commit }, value) => {
  let se = store.get('seat') !== undefined ? store.get('seat') : [false, false, false, false, false, false, false, false, false, false]
  se.splice(value, 1, !se[value])
  store.set('seat', se)
  commit(types.SET_SEAT, value)
}
export const getData = ({ commit }) => {
  commit(types.GET_DATA)
  let data = {
    userName: store.get('userName'),
    playGame: store.get('playGame'),
    seat: store.get('seat') !== undefined ? store.get('seat') : [false, false, false, false, false, false, false, false, false, false],
    player: store.get('player') !== undefined ? store.get('player') : [],
    identify: store.get('identify') !== undefined ? store.get('identify') : []
  }
  return data
}
