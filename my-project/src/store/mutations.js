import * as types from './mutation-types'
import store from 'storejs' // store save as localStorage
// state
const state = {
  ip: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // store.get('ip'),
  identify: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // store.get('userInfo') !== undefined ? store.get('userInfo') : null,
  userName: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], // store.get('userName') !== undefined ? store.get('userName') : null
  playGame: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''] // true/false
}

// mutations
const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  // 在 mutation 改變 state（只有 mutation 可以改變！）
  [types.SET_IDENTIFY] (state) {
    state.identify = undefined
  },
  [types.SET_IP] (state, payload) {
    state.ip = payload
  },
  [types.SET_USERNAME] (state, payload) {
    state.userName[state.] = payload || undefined
  }
}
export {
  state,
  mutations
}
