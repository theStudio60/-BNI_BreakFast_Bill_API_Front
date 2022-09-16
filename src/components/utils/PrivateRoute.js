import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import cookies from 'js-cookie';


export default function PrivateRoute({children}) {

    const location = useLocation();

    if(location.pathname === '/login'){
        if(cookies.get('BEARER')){
            return <Navigate replace to="/" />
        }
    }else{
        if(!cookies.get('BEARER')){
            return <Navigate replace to="/login" />
        }
    }

        return children;
}