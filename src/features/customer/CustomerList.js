import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import apiBni from "../../conf/axios/api.bni";
import { setAlert, setCustomers } from "../../redux";
import { Loading } from "../../components/utils";
import {FaEye} from 'react-icons/fa';
import dateFormat from "dateformat"

//création de la requete
const fetchCustomers = () => {
  return async (dispatch) => {
    await apiBni
      .get("/customers?page=1&itemsPerPage=30")
      .then((response) => {
        if (response.status === 200) {
          dispatch(setCustomers(response));
        }
      })
      //si item pas valide on update le state pour mettre un message d'erreur
      .catch((err) => {
        dispatch(setAlert({ "color":"danger", "message":"Une erreur est survenue !"}));
      });
  };
};

export default function CustomerList() {

  const customers = useSelector((state) => state.customers.data);
  const dispatch = useDispatch();

  //création de notre requete API avec useEffect
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  if(customers){
    return (
      <>
      <table className="app_table">
        <thead>
          <tr>
            <th>#</th>
            <th>Prénom</th>
            <th>nom</th>
            <th>Ville</th>
            <th>Date entrée</th>
            <th>Date sortie</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {customers["hydra:member"].map((customer, index) => (
            <CustomerListUnit customer={customer} key={customer.id} />
        ))}
        </tbody>
        </table>
      </>
    );
  }else{
    return <Loading />
  }
}

function CustomerListUnit(props){

  const dateDay = new Date();
  const membreDone = new Date(props.customer.membership.membership_done_at);

  let trStyle = "app_table__tr--green";
  if(dateDay > membreDone){
    trStyle = "app_table__tr--red";
  }

  return (
    <tr className={trStyle}>
      <th scope="row">{props.customer.id}</th>
      <td>{props.customer.firstname}</td>
      <td>{props.customer.lastname}</td>
      <td>{props.customer.zip_code+" "+props.customer.city}</td>
      <td>{dateFormat(props.customer.membership.membership_at, "dd.mm.yyyy")}</td>
      <td>{dateFormat(props.customer.membership.membership_done_at, "dd.mm.yyyy")}</td>
      <td><NavLink to={"/customer/" + props.customer.id} className="nav-link" key={props.customer.id}><FaEye /></NavLink></td>
    </tr>
  )
}
