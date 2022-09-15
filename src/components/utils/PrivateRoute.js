import React from 'react';
import { Navigate } from 'react-router-dom';


export default function PrivateRoute({children}) {
    
console.log();
    const loged = true;

        if(!loged){
            return <Navigate to="/login" />
        }

        return children;
}