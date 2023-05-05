import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBInput, MDBValidation, MDBBtn, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/features/authSlice';
import Swal from 'sweetalert2';
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}
const Register = () => {

  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }))
  const { email, password, name, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Record not found',
      showConfirmButton: false,
      timer: 1500
    })
  }, [error])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return Swal.fire(
        'confirm password did not match'
      )
    }
    if (email && password && name && confirmPassword) {
      dispatch(register({ formValue, navigate }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }
  return (
    <div style={{ margin: "auto", padding: '15px', maxWidth: '450px', alignContent: "center", marginTop: '120px' }}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x' />
        <h5>Register</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className="col-md-12">
              <MDBInput
                label='Name'
                type='text'
                value={name}
                name='name'
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label='Email'
                type='email'
                value={email}
                name='email'
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label='Password'
                type='password'
                value={password}
                name='password'
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label='Confirm Password'
                type='password'
                value={confirmPassword}
                name='confirmPassword'
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className='mt-2'>
                {loading && (
                  <MDBSpinner
                    size='sm'
                    role='status'
                    tag="span"
                    className='me-2'
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <Link to='/login'>
          <p>Already have an account ? Login</p>
        </Link>
      </MDBCard>
    </div>
  )
}

export default Register
