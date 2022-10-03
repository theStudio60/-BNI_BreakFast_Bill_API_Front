import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import apiBni from "../../conf/axios/api.bni";
import { setAlert, setCustomers } from "../../redux";
import { Loading } from "../../components/utils";

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
        {customers["hydra:member"].map((customer, index) => (
          <NavLink to={"/customer/" + customer.id} className="nav-link" key={customer.id}>
            {customer.id+" - "+customer.firstname+" "+customer.lastname}
          </NavLink>
        ))}
      </>
    );
  }else{
    return <Loading />
  }
}
