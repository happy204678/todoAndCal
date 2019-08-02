import * as types from './mutation-types'
import store from 'storejs' // store save as localStorage
// state
const state = {
  ip: store.get('ip') !== undefined ? store.get('ip') : [], // store.get('ip'),
  identify: [], // store.get('userInfo') !== undefined ? store.get('userInfo') : null,
  userName: store.get('userName') !== undefined ? store.get('userName') : [],
  playGame: store.get('playGame') !== undefined ? store.get('playGame') : [], // true/false
  online: 0,
  seat: store.get('seat') !== undefined ? store.get('seat') : [false, false, false, false, false, false, false, false, false, false]
}

// mutations
const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  // 在 mutation 改變 state（只有 mutation 可以改變！）
  // [types.SET_IDENTIFY] (state, payload) {
  //   state.identify.push(payload)
  // },
  // [types.SET_IP] (state, payload) {
  //   state.ip.push(payload)
  // },
  [types.SET_USERNAME] (state, payload) {
    state.userName.push(payload)
    state.online = state.userName.length
    // store.remove('userName') // 刪State
    // state.userName = []
    // store.remove('playGame')
    // state.playGame = []
    // store.remove('seat')
    // state.seat = [false, false, false, false, false, false, false, false, false, false]
  },
  [types.SET_LOGOUT] (state, payload) {
    state.userName.splice(payload, 1)
    state.playGame.splice(payload, 1)
  },
  [types.SET_PLAYGAME] () {
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
