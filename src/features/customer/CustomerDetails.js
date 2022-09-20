import { Component } from "react";
import apiBni from "../../conf/axios/api.bni";
import { Loading, Alert } from "../../components/utils";

export default class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { customer: null, errorMessage: null, loaded: true };
  }

  componentDidMount() {
    //Récupère le id en découpant la route
    let path = this.props.path['*'];
    const id = path.split("/")[1];

    //Requete pour récuperer id
    apiBni
      .get("/customers/"+id, {})
      .then((response) => {
        if (response.status === 200) {
          const customer = response.data;
          this.setState({ customer: customer, loaded: false });
        }
      })
      //si customer pas valide on update le state pour mettre un message d'erreur
      .catch((err) => {
        this.setState({ errorMessage: err.message, loaded: false });
      });
  }

  render() {
    return (
      <>
        {/* affichage du message d'erreur */}
        {this.state.errorMessage && (
          <Alert message={this.state.errorMessage} color="danger" />
        )}
        {this.state.loaded || this.state.customer === null ? (
          <Loading />
        ) : (
          this.state.customer.id+' - '+this.state.customer.firstname
        )}
      </>
    );
  }
}
