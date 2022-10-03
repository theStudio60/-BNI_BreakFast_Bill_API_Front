import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import apiBni from "../../../conf/axios/api.bni";
import { setAlert, setSessions } from "../../../redux";
import { Loading } from "../../../components/utils";

//création de la requete
const fetchSessions = () => {
  return async (dispatch) => {
    await apiBni
      .get("/sessions?page=1&itemsPerPage=30")
      .then((response) => {
        if (response.status === 200) {
          dispatch(setSessions(response));
        }
      })
      //si item pas valide on update le state pour mettre un message d'erreur
      .catch((err) => {
        dispatch(setAlert({ "color":"danger", "message":"Une erreur est survenue !"}));
      });
  };
};

export default function SessionsList() {

  const sessions = useSelector((state) => state.sessions.data);
  const dispatch = useDispatch();

  //création de notre requete API avec useEffect
  useEffect(() => {
    dispatch(fetchSessions());
  }, []);

  if(sessions){
    return (
      <>
        {sessions["hydra:member"].map((session, index) => (
          <NavLink to={ "/session/"+session.id } className="nav-link" key={session.id}>{session.session_type.name}</NavLink>
        ))}
      </>
    );
  }else{
    return <Loading />
  }
}
