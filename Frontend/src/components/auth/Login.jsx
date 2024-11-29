import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Form Values:', values);
      alert('Login successful');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-secondary text-dark p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit}>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded bg-accent text-primary font-bold hover:bg-dark hover:text-secondary"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
