import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/userThunk';
import { useNavigate } from 'react-router-dom';

function Register() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async(values) => {
      console.log('Form Values:', values);
      alert('Registration Successful');
      const res=await dispatch(registerUser(values))
      console.log(res,"response")
      if(res.payload.message=="created"){
        navigate('/login')
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-secondary text-dark p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-dark"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className={`w-full p-2 border rounded bg-primary text-dark ${
                formik.errors.username && formik.touched.username
                  ? 'border-red-500'
                  : 'border-accent'
              }`}
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-dark" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full p-2 border rounded bg-primary text-dark ${
                formik.errors.email && formik.touched.email
                  ? 'border-red-500'
                  : 'border-accent'
              }`}
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-dark"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`w-full p-2 border rounded bg-primary text-dark ${
                formik.errors.password && formik.touched.password
                  ? 'border-red-500'
                  : 'border-accent'
              }`}
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-dark"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={`w-full p-2 border rounded bg-primary text-dark ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? 'border-red-500'
                  : 'border-accent'
              }`}
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded bg-accent text-primary font-bold hover:bg-dark hover:text-secondary"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
