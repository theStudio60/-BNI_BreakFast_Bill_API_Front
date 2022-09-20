import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';

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