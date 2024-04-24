import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {

const {user} = useAuth() || {};

const location = useLocation();

  if(user){
    return children;
  }
  else{
    return <Navigate to='/user/login' state={location?.pathname || '/'}/>
  }

}


export default PrivateRoute