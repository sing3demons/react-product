import React from 'react'
import { Redirect, Route } from 'react-router-dom'

// console.log(isAuth)

// Protected Route
// export const PrivateRoute = ({ component: Component, ...rest }) => {
//   let isAuth = false
//   const token = localStorage.getItem('token')

//   if (token) {
//     isAuth = true
//   }
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         // ternary condition
//         isAuth ? <Component {...props} /> : <Redirect to="/users/login" />
//       }
//     />
//   )
// }

export default function PrivateRoute({ children, ...rest }) {
  let isAuth = false
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    isAuth = true
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/users/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
