import * as types from './mutation-types'
import store from 'storejs' // store save as localStorage
// state
const state = {
  ip: store.get('ip') !== undefined ? store.get('ip') : [], // store.get('ip'),
  identify: store.get('identify') !== undefined ? store.get('identify') : [],
  userName: store.get('userName') !== undefined ? store.get('userName') : [],
  playGame: store.get('playGame') !== undefined ? store.get('playGame') : [], // true/false
  player: store.get('player') !== undefined ? store.get('player') : [],
  online: 0,
  seat: store.get('seat') !== undefined ? store.get('seat') : [false, false, false, false, false, false, false, false, false, false],
  OGMode: [1, 1, 1, 1, 2, 3, 4, 5, 5, 5] // 1平民 2女巫 3預言家 4獵人 5狼
}

// mutations
const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  // 在 mutation 改變 state（只有 mutation 可以改變！）
  [types.SET_IDENTIFY] (state, payload) {
    state.identify = payload
  },
  // [types.SET_IP] (state, payload) {
  //   state.ip.push(payload)
  // },
  [types.SET_USERNAME] (state, payload) {
    state.userName.push(payload)
    state.playGame.push(false)
    state.online = state.userName.length
    // store.remove('userName') // 刪State
    // state.userName = []
    // store.remove('playGame')
    // state.playGame = []
    // store.remove('seat')
    // state.seat = [false, false, false, false, false, false, false, false, false, false]
    // store.player = []
  },
  [types.SET_LOGOUT] (state, payload) {
    state.userName.splice(payload, 1)
    state.playGame.splice(payload, 1)
  },
  [types.SET_PLAYGAME] (state, payload) {
    state.playGame.splice(payload, 1, !state.playGame[payload])
  },
  [types.SET_PLAYER] () {
  },
  [types.SET_POPPLAYER] (state, payload) {
    state.player.splice(payload, 1)
  },
  [types.SET_GAMEOVER] () {
  },
  [types.SET_SEAT] (state, payload) {
    state.seat.splice(payload, 1, !state.seat[payload])
  },
  [types.GET_DATA] () {
  }
}
export {
  state,
  mutations
}
