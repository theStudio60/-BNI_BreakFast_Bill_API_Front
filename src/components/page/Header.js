import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
import {GrLogout, GrUser, GrSettingsOption } from 'react-icons/gr'
import { NavLink } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

    function logout(){
        cookies.remove('BEARER', { sameSite:'strict' });
        navigate("/login");
    }
    

        return(
            <div className="header">
                <p className='header--logo'>LOGO</p>
                <div className='header--container'>
                    <select name="Mois" className='header--container--select'>
                        <option className='header--container--options' value="">Mois en cours</option>
                    </select>
                    <select name="Mois" className='header--container--select--small'>
                        <option value="">2022</option>
                    </select>
                    <NavLink to="/rappel" className="header--container--link">
                        
                        Rappel{" "}
                    </NavLink>
                    <NavLink to="/archives" className="header--container--link">
                        
                        Archives{" "}
                    </NavLink>
                </div>

                <div className="header--button--menu">
                    <button  className="header--button--icons"><GrUser className="header--buttons-icons-gr"/></button>
                    <button  className="header--button--icons"><GrSettingsOption className="header--buttons-icons-gr" /></button>
                    <button onClick={logout} className="header--button--icons"><GrLogout className="header--buttons-icons-gr"/></button>
                </div>
            </div>
        );

}