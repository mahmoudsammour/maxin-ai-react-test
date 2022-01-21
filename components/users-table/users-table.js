import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'
import qs from 'qs';
import Link from 'next/link'

const UsersTable = ({ users, page, onDelete, onEdit }) => {
  const nextQuery = qs.stringify({ page: page + 1 });
  const prevQuery = qs.stringify({ page: page - 1 });

  return (
    <>
      <div className='wrapper'>
        {
          page > 0 ? <>
            <Link href={`/?${prevQuery}`}>Previous</Link>
            {' '}
          </> : null
        }
        {
          users.length !== 0 ?
            <Link href={`/?${nextQuery}`}>Next</Link>
            : null
        }
      </div>
      <table className="users-table">
        <thead className="users-table__header">
          <tr className='users-table__tr'>
            <th className='users-table__th'>Id</th>
            <th className='users-table__th'>First Name</th>
            <th className='users-table__th'>Last Name</th>
            <th className='users-table__th'>Email</th>
            <th className='users-table__th'>Actions</th>
          </tr>
        </thead>
        <tbody className="users-table__body">
          {
            users.map((user) => <tr className='users-table__tr' key={user.id}>
              <td data-column='Id' className='users-table__td'>{user.id}</td>
              <td data-column='First Name' className='users-table__td'>{user.firstName}</td>
              <td data-column='Last Name' className='users-table__td'>{user.lastName}</td>
              <td data-column='Email' className='users-table__td'>{user.email}</td>
              <td data-column='Actions' className='users-table__td'>
                <button className='users-table__button' onClick={() => onDelete(user.id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>{''}
                <button className='users-table__button' onClick={() => onEdit(user)}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </>
  )
}

UsersTable.defaultProps = {
  page: 0,
}
UsersTable.propTypes = {
  page: PropTypes.number
}

export { UsersTable }