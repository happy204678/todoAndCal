import * as types from './mutation-types'
import store from 'storejs' // store save as localStorage
// state
const state = {
  language: store.get('language') || 'zh-cn',
  ip: store.get('ip'),
  userInfo: store.get('userInfo') !== undefined ? store.get('userInfo') : null,
  userName: store.get('userName') !== undefined ? store.get('userName') : null,
  site: store.get('site'),
  forgetTrigger: store.get('forgetTrigger') || 0,
  authToken: store.get('authToken') !== undefined ? store.get('authToken') : null,
  showModal: store.get('showModal') !== undefined ? store.get('showModal') : 0,
  showErrorModal: store.get('showErrorModal') !== undefined ? store.get('showErrorModal') : 0,
  businessNumber: store.get('businessNumber') !== undefined ? store.get('businessNumber') : null,
  AID: store.get('AID') !== undefined ? store.get('AID') : null,
  sessionID: store.get('sessionID') !== undefined ? store.get('sessionID') : null,
  lotterID: store.get('lotterID') !== undefined ? store.get('lotterID') : null,
  playTypeID: store.get('playTypeID') !== undefined ? store.get('playTypeID') : null,
  totalBetList: store.get('totalBetList') !== undefined ? store.get('totalBetList') : [],
  hall: store.get('hall') !== undefined ? store.get('hall') : '',
  returnURL: store.get('returnURL') !== undefined ? store.get('returnURL') : '',
  logoutCountDown: store.get('returnURL') !== undefined ? store.get('logoutCountDown') : 300,
  pceggAlert: store.get('pceggAlert') !== undefined ? store.get('pceggAlert') : true
}

// mutations
const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  // 在 mutation 改變 state（只有 mutation 可以改變！）
  [types.SET_LOGOUT] (state) {
    state.userInfo = undefined
    state.authToken = undefined
  },
  [types.SET_LANGUAGE] (state, payload) {
    state.language = payload
  },
  [types.SET_IP] (state, payload) {
    state.ip = payload
  },
  [types.SET_USERINFO] (state, payload) {
    state.userInfo = payload
  },
  [types.UPDATE_USERPHONE] (state, payload) {
    state.userInfo.Affiliate_TEL = payload
  },
  [types.SET_USERNAME] (state, payload) {
    state.userName = payload || undefined
  },
  [types.SET_FORGETTRIGGER] (state, payload) {
    state.forgetTrigger = payload
  },
  [types.SET_TOKEN] (state, payload) {
    state.authToken = payload
  },
  [types.SET_MODAL] (state, payload) {
    state.showModal = payload
  },
  [types.SET_USERVERIFY] (state, payload) {
    state.userVerify = payload
  },
  [types.SET_ERROR_MODAL] (state, payload) {
    state.showErrorModal = payload
  },
  [types.SET_BUSINESSNUMBER] (state, payload) {
    state.businessNumber = payload
  },
  [types.SET_AID] (state, payload) {
    state.AID = payload
  },
  [types.SET_SESSIONID] (state, payload) {
    state.sessionID = payload
  },

  [types.SET_LOTTERID] (state, payload) {
    state.lotterID = payload
  },
  [types.SET_PLAYTYPEID] (state, payload) {
    state.playTypeID = payload
  },
  [types.SET_TOTALBETLIST] (state, payload) {
    state.totalBetList = payload
  },
  [types.SET_HALL] (state, payload) {
    state.hall = payload
  },
  [types.SET_RETURNURL] (state, payload) {
    state.returnURL = payload
  },
  [types.SET_LOGOUTCOUNTDOWN] (state, payload) {
    state.logoutCountDown = payload
  },
  [types.SET_PCEGGALERT] (state, payload) {
    state.pceggAlert = payload
  }
}
export {
  state,
  mutations
}
