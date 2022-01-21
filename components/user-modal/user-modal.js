import PropTypes from 'prop-types'
import Modal from 'react-modal';
import { Formik } from 'formik';

const UserModal = ({ modalIsOpen, user, onRequestClose, onSubmit }) => {
  const customStyles = {
    content: {
      padding: '20px',
      width: '30%',
      height: '200px',
      padding: '50px',
      margin: 'auto',
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="User Modal"
    >
      <button onClick={onRequestClose}>close</button>
      <Formik
        initialValues={user}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }

          return errors;
        }}
        onSubmit={(values) => {
          onSubmit(values);
          onRequestClose(!modalIsOpen)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && errors.firstName}
            <input
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            {errors.lastName && touched.lastName && errors.lastName}
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  )
}

UserModal.defaultProps = {
  modalIsOpen: false,
  user: null,
  onRequestClose: null
}
UserModal.propTypes = {
  modalIsOpen: PropTypes.bool,
  user: PropTypes.object,
  onRequestClose: PropTypes.func
}

export { UserModal }