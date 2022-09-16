import react, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
import apiBni from '../../conf/axios/api.bni';

export default function Header() {

    const navigate = useNavigate();

    function logout(){
        cookies.remove('BEARER', { sameSite:'strict' });
        navigate("/login");
    }
    

        return(
            <>
            <button onClick={logout} >Logout</button>
            </>
        );

}