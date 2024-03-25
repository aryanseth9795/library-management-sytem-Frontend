import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
export default function ProtectedRoute({children,user,redirect="/"}) {
  
    if(!user) return <Navigate to={redirect}/>
    
   return children?children:<Outlet/>
  
}
