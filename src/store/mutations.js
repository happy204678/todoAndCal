import * as types from './mutation-types'
import store from 'storejs' // store save as localStorage
// state
const state = {
  // ip: store.get('ip') !== undefined ? store.get('ip') : [], // store.get('ip'),
  identify: store.get('identify') !== undefined ? store.get('identify') : [],
  userName: store.get('userName') !== undefined ? store.get('userName') : [], // audience
  player: store.get('player') !== undefined ? store.get('player') : [],
  online: 0,
  gameStart: store.get('gameStart') !== undefined ? store.get('gameStart') : false,
  night: store.get('night') !== undefined ? store.get('night') : false,
  nightCount: store.get('nightCount') !== undefined ? store.get('nightCount') : 0,
  step: store.get('step') !== undefined ? store.get('step') : 0, // include morning and night
  vote: store.get('vote') !== undefined ? store.get('vote') : [],
  killed: store.get('killed') !== undefined ? store.get('killed') : []
}

// mutations
const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  // 在 mutation 改變 state（只有 mutation 可以改變！）
  [types.SET_IDENTIFY] (state, payload) {
    state.identify = payload
  },
  [types.SET_USERNAME] (state, payload) {
    state.userName.push(payload)
    state.online = state.userName.length
    // store.remove('userName') // 刪State
    // state.userName = []
    // store.remove('player')
    // state.player = []
    // state.gameStart = false
  },
  [types.SET_LOGOUT] (state, payload) {
    state.userName.splice(payload, 1)
    state.player.splice(payload, 1)
  },
  [types.SET_PLAYER] (state, payload) {
    state.player.push(payload)
  },
  [types.SET_POPPLAYER] (state, payload) {
    state.player.splice(payload, 1)
  },
  [types.SET_DIEOUT] (state, payload) {
    state.player = payload
  },
  [types.SET_SORTPLAYER] (state, payload) {
    state.player = payload
  },
  [types.SET_NIGHT] (state, payload) {
    state.night = payload
  },
  [types.SET_NIGHTCOUNT] (state, payload) {
    state.nightCount = payload
  },
  [types.SET_STEP] (state, payload) {
    state.step = payload
  },
  [types.SET_VOTE] (state, payload) {
    state.vote = payload
  },
  [types.SET_KILLED] (state, payload) {
    state.killed = payload
  },
  [types.SET_GAMEOVER] (state) {
    state.player = []
    state.gameStart = false
  },
  [types.SET_GAMESTART] (state) {
    state.gameStart = true
  },
  [types.GET_DATA] () {
  }
}
export {
  state,
  mutations
}
