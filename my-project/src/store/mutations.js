import * as types from './mutation-types'
import store from 'storejs' // store save as localStorage
// state
const state = {
  number: store.get('number') !== undefined ? store.get('number') : [], // player's num
  ip: [], // store.get('ip'),
  identify: [], // store.get('userInfo') !== undefined ? store.get('userInfo') : null,
  userName: store.get('userName') !== undefined ? store.get('userName') : [],
  playGame: [], // true/false
  online: 0
}

// mutations
const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  // 在 mutation 改變 state（只有 mutation 可以改變！）
  [types.SET_IDENTIFY] (state, payload) {
    state.identify.push(payload)
  },
  [types.SET_IP] (state, payload) {
    state.ip.push(payload)
  },
  [types.SET_USERNAME] (state, payload) {
    store.set('userName', state.userName.push(payload))
    state.online = state.userName.length
  },
  [types.SET_PLAYGAME] (state, payload) {
    console.log(payload)
    state.playGame.push(payload)
  },
  [types.SET_NUMBER] (state, payload) {
    store.set('userName', state.number.push(payload))
  },
  [types.SET_LOGOUT] (state, payload) {
    state.userName.splice(payload, 1)
    state.number.splice(payload, 1)
  }
}
export {
  state,
  mutations
}
