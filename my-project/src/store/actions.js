
import * as types from './mutation-types'
import store from 'storejs'

export const setUserName = ({ commit }, value) => {
  let array = store.get('userName') !== undefined ? store.get('userName') : []
  array.push(value)
  store.set('userName', array)
  commit(types.SET_USERNAME, value)
}
export const setIdentify = ({ commit }, value) => {
  store.set('identify', value)
  commit(types.SET_IDENTIFY, value)
}
export const setPlayer = ({ commit }, value) => {
  let array = store.get('player') !== undefined ? store.get('player') : []
  array.push(value)
  store.set('player', array)
  commit(types.SET_PLAYER, value)
}
export const setSortPlayer = ({ commit }, value) => {
  store.set('player', value)
  commit(types.SET_SORTPLAYER, value)
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

  commit(types.SET_LOGOUT, value)
}
export const setGameStart = ({ commit }) => {
  store.set('gameStart', true)
  commit(types.SET_GAMESTART)
}
export const setGameOver = ({ commit }) => {
  store.set('player', [])
  store.set('gameStart', false)
  commit(types.SET_GAMEOVER)
}
export const getData = ({ commit }) => {
  commit(types.GET_DATA)
  let data = {
    userName: store.get('userName'),
    player: store.get('player') !== undefined ? store.get('player') : [],
    identify: store.get('identify') !== undefined ? store.get('identify') : [],
    gameStart: store.get('gameStart') !== undefined ? store.get('gameStart') : false
  }
  return data
}
