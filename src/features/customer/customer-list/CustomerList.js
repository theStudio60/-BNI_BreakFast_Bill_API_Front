import { Component } from "react";
import apiBni from "../../../conf/axios/api.bni";
import { Loading, ErrorMessage } from "../../../components/utils";

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: null, errorMessage: null, loaded: true };
  }

  componentDidMount() {
    apiBni
      .get("/customers?page=1&itemsPerPage=10", {})
      .then((response) => {
        if (response.status === 200) {
          const customers = response.data;
          this.setState({ customers: customers, loaded: false });
        }
      })
      //si login pas valide on update le state pour mettre un message d'erreur
      .catch((err) => {
        this.setState({ errorMessage: err.message, loaded: false });
      });
  }

  render() {
    return (
      <>
        {/* affichage du message d'erreur */}
        {this.state.errorMessage && (
          <ErrorMessage message={this.state.errorMessage} color="danger" />
        )}
        {this.state.loaded || this.state.customers === null ? (
          <Loading />
        ) : (
          this.state.customers["hydra:member"].map((customer, index) => (
            <div key={customer.id}>{customer.firstname+' '+customer.lastname}</div>
          ))
        )}
      </>
    );
  }
}
