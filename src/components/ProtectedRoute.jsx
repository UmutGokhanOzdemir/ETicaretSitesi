import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((s) => s.client.user)
  const isLoggedIn = !!user?.email

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default ProtectedRoute
