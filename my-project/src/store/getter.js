// export const apiUrl = state => { return state.apiUrl }
export const ip = (state, num) => { return state.ip[num] }
export const userName = state => { return state.userName }
export const identify = (state, num) => { return state.identify[num] }
export const playGame = (state, num) => { return state.playGame[num] }
export const online = state => { return state.userName.length }
