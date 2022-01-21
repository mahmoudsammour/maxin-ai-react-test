import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers, deleteUser, editUser } from '../actions'
import { UsersTable } from '../components'
import { UserModal } from '../components/user-modal/user-modal'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userToEdit, setUserToEdit] = useState(null);
  const { page } = router.query;
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers(page))
  }, [dispatch, page])

  const deleteHandler = useCallback((id) => {
    let text = "Are you sure?";
    if (confirm(text) == true) {
      dispatch(deleteUser(id))
    }
  })

  const editHandler = useCallback((user) => {
    dispatch(editUser(user))
  })

  return (
    <div className="app">
      <UsersTable onDelete={deleteHandler} users={users} page={page ? parseInt(page) : null} onEdit={(user) => setUserToEdit(user)} />
      <UserModal modalIsOpen={!!userToEdit} onRequestClose={() => setUserToEdit(null)} user={userToEdit} onSubmit={editHandler}></UserModal>
    </div>
  )
}

export default Index
