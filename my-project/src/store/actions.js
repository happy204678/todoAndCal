
import * as types from './mutation-types'
import store from 'storejs'

export const setUserName = ({ commit }, value) => {
  let array = store.get('userName') !== undefined ? store.get('userName') : []
  array.push(value)
  store.set('userName', array)
  commit(types.SET_USERNAME, value)
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
export const setIdentify = ({ commit }, value) => {
  store.set('identify', value)
  commit(types.SET_IDENTIFY, value)
}
export const setNight = ({ commit }, value) => {
  store.set('night', value)
  commit(types.SET_NIGHT, value)
}
export const setNightCount = ({ commit }, value) => {
  store.set('nightCount', value)
  commit(types.SET_NIGHTCOUNT, value)
}
export const setStep = ({ commit }, value) => {
  store.set('step', value)
  commit(types.SET_STEP, value)
}
export const setVote = ({ commit }, obj) => {
  if (obj.value === 99) {
    let array = []
    store.set('vote', array)
    commit(types.SET_VOTE, array)
  } else {
    let array = store.get('vote') !== undefined ? store.get('vote') : []
    array[obj.player] = obj.value
    store.set('vote', array)
    commit(types.SET_VOTE, array)
  }
}
export const setKilled = ({ commit }, value) => {
  if (value === 99) {
    let array = []
    store.set('killed', array)
    commit(types.SET_KILLED, array)
  } else {
    let array = store.get('killed') !== undefined ? store.get('killed') : []
    array.push(value)
    store.set('killed', array)
    commit(types.SET_KILLED, array)
  }
}
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
  store.set('vote', [])
  store.set('killed', [])
  commit(types.SET_GAMEOVER)
}
export const getData = ({ commit }) => {
  commit(types.GET_DATA)
  let data = {
    userName: store.get('userName'),
    player: store.get('player') !== undefined ? store.get('player') : [],
    identify: store.get('identify') !== undefined ? store.get('identify') : [],
    gameStart: store.get('gameStart') !== undefined ? store.get('gameStart') : false,
    night: store.get('night') !== undefined ? store.get('night') : false,
    nightCount: store.get('nightCount') !== undefined ? store.get('nightCount') : false,
    step: store.get('step') !== undefined ? store.get('step') : 0,
    vote: store.get('vote') !== undefined ? store.get('vote') : [],
    killed: store.get('killed') !== undefined ? store.get('killed') : []
  }
  return data
}
