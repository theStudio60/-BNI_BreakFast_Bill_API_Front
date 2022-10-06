import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function Header() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.data);   
    const association = useSelector((state) => state.user.data.association);   

    function logout(){
        cookies.remove('APICOOKIE', { sameSite:'strict' });
        navigate("/login");
    }   

        return(
            <>
            <div className="header" >
                <img src={process.env.REACT_APP_SERVER_NAME+"/img/logos/"+association.logoImg} alt="logo" className="header--image"></img>
                <button onClick={logout} >Logout</button>
                {"Bonjour "+user.firstname+" "+user.lastname}
            </div>
            </>
        );



}