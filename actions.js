import * as types from './types'
import qs from 'qs';
import axios from 'axios';

export const getUsers = (page = 0) => (dispatch) => {
  const query = qs.stringify({ page });
  axios.get(`http://localhost:4000/users?${query}`).then(({ data }) => {
    dispatch({ type: types.FETCH_USERS_SUCCESS, payload: { data, page } })
  })

}

export const deleteUser = (userId) => (dispatch) => {
  axios.delete(`http://localhost:4000/users/${userId}`).then(({ data }) => {
    dispatch({ type: types.DELETE_USER_SUCCESS, payload: { data, userId } })
  })
}

export const editUser = (user) => (dispatch) => {
  axios.put(`http://localhost:4000/users/${user.id}`, user).then(({ data }) => {
    dispatch({ type: types.EDIT_USER_SUCCESS, payload: { data, user } })
  })
}
