import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'

const FALLBACK_ROLES = [
  { id: 1, code: 'admin', name: 'Admin' },
  { id: 2, code: 'store', name: 'Store' },
  { id: 3, code: 'customer', name: 'Customer' }
]

function SignUpPage() {
  const history = useHistory()
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { role_id: '' }
  })

  const password = watch('password')
  const selectedRoleId = watch('role_id')
  const selectedRole = roles.find((r) => String(r.id) === String(selectedRoleId))
  const isStore = selectedRole?.code === 'store'

  useEffect(() => {
    let cancelled = false
    axiosInstance
      .get('/roles')
      .then((res) => {
        if (cancelled) return
        const list = Array.isArray(res.data) ? res.data : FALLBACK_ROLES
        setRoles(list)
        const customer = list.find((r) => r.code === 'customer')
        if (customer) setValue('role_id', String(customer.id))
      })
      .catch(() => {
        if (cancelled) return
        setRoles(FALLBACK_ROLES)
        const customer = FALLBACK_ROLES.find((r) => r.code === 'customer')
        if (customer) setValue('role_id', String(customer.id))
      })
    return () => {
      cancelled = true
    }
  }, [setValue])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const basePayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: Number(data.role_id)
      }

      const payload = isStore
        ? {
            ...basePayload,
            store: {
              name: data.store_name,
              phone: data.store_phone,
              tax_no: data.store_tax_id,
              bank_account: data.store_bank_account
            }
          }
        : basePayload

      await axiosInstance.post('/signup', payload)
      toast.success('You need to click link in email to activate your account!')
      history.goBack()
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'An error occurred. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center bg-white py-12">
      <div className="flex flex-col gap-6 w-full max-w-[530px] px-4">
        <h2 className="text-4xl font-bold text-dark text-center">Sign Up</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Name</label>
            <input
              type="text"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters'
                }
              })}
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none focus:border-primary"
            />
            {errors.name && (
              <span className="text-xs text-alert">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
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
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none focus:border-primary"
            />
            {errors.email && (
              <span className="text-xs text-alert">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                  message:
                    'Must include uppercase, lowercase, number and special character'
                }
              })}
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none focus:border-primary"
            />
            {errors.password && (
              <span className="text-xs text-alert">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Password Validation */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('password_confirm', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match'
              })}
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none focus:border-primary"
            />
            {errors.password_confirm && (
              <span className="text-xs text-alert">
                {errors.password_confirm.message}
              </span>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-dark">Role</label>
            <select
              {...register('role_id', { required: 'Role is required' })}
              className="bg-input-bg border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none focus:border-primary"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <span className="text-xs text-alert">
                {errors.role_id.message}
              </span>
            )}
          </div>

          {/* Store fields */}
          {isStore && (
            <div className="flex flex-col gap-4 p-4 border border-border rounded-[5px] bg-light">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-dark">
                  Store Name
                </label>
                <input
                  type="text"
                  {...register('store_name', {
                    required: 'Store name is required',
                    minLength: {
                      value: 3,
                      message: 'Store name must be at least 3 characters'
                    }
                  })}
                  className="bg-white border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none focus:border-primary"
                />
                {errors.store_name && (
                  <span className="text-xs text-alert">
                    {errors.store_name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-dark">
                  Store Phone
                </label>
                <input
                  type="tel"
                  placeholder="+905XXXXXXXXX"
                  {...register('store_phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^(\+90|0)?5\d{9}$/,
                      message: 'Please enter a valid Turkish phone number'
                    }
                  })}
                  className="bg-white border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none focus:border-primary"
                />
                {errors.store_phone && (
                  <span className="text-xs text-alert">
                    {errors.store_phone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-dark">
                  Store Tax ID
                </label>
                <input
                  type="text"
                  placeholder="TXXXXVXXXXXX"
                  {...register('store_tax_id', {
                    required: 'Tax ID is required',
                    pattern: {
                      value: /^T\d{4}V\d{6}$/,
                      message: 'Tax ID must match format TXXXXVXXXXXX'
                    }
                  })}
                  className="bg-white border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none focus:border-primary"
                />
                {errors.store_tax_id && (
                  <span className="text-xs text-alert">
                    {errors.store_tax_id.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-dark">
                  Store Bank Account (IBAN)
                </label>
                <input
                  type="text"
                  placeholder="TR000000000000000000000000"
                  {...register('store_bank_account', {
                    required: 'IBAN is required',
                    pattern: {
                      value: /^TR\d{2}\d{4}\d{1}\d{16}$/,
                      message: 'Please enter a valid Turkish IBAN'
                    }
                  })}
                  className="bg-white border border-border rounded-[5px] px-[21px] h-[50px] text-sm outline-none focus:border-primary"
                />
                {errors.store_bank_account && (
                  <span className="text-xs text-alert">
                    {errors.store_bank_account.message}
                  </span>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold rounded-[5px] px-[40px] h-[52px] disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
