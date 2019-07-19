
import * as types from './mutation-types'
import store from 'storejs'

export const setToken = ({ commit }, value) => {
  store.set('authToken', value)
  commit(types.SET_TOKEN, value)
}

export const setModal = ({ commit }, value) => {
  store.set('showModal', value)
  commit(types.SET_MODAL, value)
}

export const setUserVerify = ({ commit }, value) => {
  store.set('userVerify', value)
  commit(types.SET_USERVERIFY, value)
}

export const setSessionID = ({ commit }, value) => {
  store.set('sessionID', value)
  commit(types.SET_SESSIONID, value)
}
export const setErrorModal = ({ commit }, value) => {
  // console.log('Modal actions: ', value)
  store.set('showErrorModal', value)
  commit(types.SET_ERROR_MODAL, value)
}

export const setLotterID = ({ commit }, value) => {
  store.set('lotterID', value)
  commit(types.SET_LOTTERID, value)
}

export const setPlayTypeID = ({ commit }, value) => {
  store.set('playTypeID', value)
  commit(types.SET_PLAYTYPEID, value)
}
