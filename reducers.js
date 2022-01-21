import { combineReducers } from 'redux'
import * as types from './types'


// INITIAL USERS STATE
const initialUsersState = {
  users: [],
  currentPage: 0,
}


const usersReducer = (state = initialUsersState, { type, payload }) => {
  switch (type) {
    case types.FETCH_USERS_SUCCESS:
      return {
        users: payload.data,
        page: payload.page
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user.id !== payload.userId)
      };
    case types.EDIT_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user => user.id !== payload.user.id ? user : payload.user)
      };
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  users: usersReducer,
}

export default combineReducers(reducers)
