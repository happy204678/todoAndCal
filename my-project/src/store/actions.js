
import * as types from './mutation-types'
import store from 'storejs'

export const setUserName = ({ commit }, value) => {
  store.set('userName', value)
  commit(types.SET_USERNAME, value)
}

// export const setUserVerify = ({ commit }, value) => {
//   store.set('userVerify', value)
//   commit(types.SET_USERVERIFY, value)
// }
