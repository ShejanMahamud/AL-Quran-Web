import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthProvider'

const PrivateRoute = ({children}) => {

const {userInfo} = useContext(AuthContext)

  return userInfo ? children : <Navigate to={'/user/login'}/>
}

export default PrivateRoute