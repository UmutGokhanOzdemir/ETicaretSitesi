import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'

// Test users (password: 12345):
// customer@commerce.com
// store@commerce.com
// admin@commerce.com

function LoginPage() {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axiosInstance.post('/login', {
        email: data.email,
        password: data.password
      })

      if (data.rememberMe && res.data?.token) {
        localStorage.setItem('token', res.data.token)
      }

      localStorage.setItem('user', JSON.stringify(res.data))

      toast.success('Logged in successfully!')
      history.goBack()
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Login failed. Please check your credentials.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center bg-white py-12">
      <div className="flex flex-col gap-6 w-full max-w-md px-4">
        <h1 className="text-3xl font-bold text-dark text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email'
                }
              })}
              className="bg-input-bg border border-border rounded px-4 py-3 text-sm outline-none focus:border-primary"
            />
            {errors.email && (
              <span className="text-xs text-alert">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="bg-input-bg border border-border rounded px-4 py-3 text-sm outline-none focus:border-primary"
            />
            {errors.password && (
              <span className="text-xs text-alert">
                {errors.password.message}
              </span>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-text font-bold">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="accent-primary"
            />
            Remember Me
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold rounded px-10 py-3 disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <p className="text-sm text-text text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-bold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
