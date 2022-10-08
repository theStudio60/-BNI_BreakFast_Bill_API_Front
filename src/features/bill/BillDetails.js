import React, { Component } from "react";
import apiBni from "../../conf/axios/api.bni";
import { Loading, Alert } from "../../components/utils";

export default class BillDetails extends Component {

  constructor(props) {
    super(props);
    this.state = { bill: null, errorMessage: null, loaded: true };
  }

  componentDidMount() {
    //Récupère le id en découpant la route
    let path = this.props.path['*'];
    const id = path.split("/")[1];

    //Requete pour récuperer id
    apiBni
      .get("/bills/"+id, {})
      .then((response) => {
        if (response.status === 200) {
          const bill = response.data;
          this.setState({ bill: bill, loaded: false });
        }
      })
      //si customer pas valide on update le state pour mettre un message d'erreur
      .catch((err) => {
        this.setState({ errorMessage: "Une erreur est survenue !", loaded: false });
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
          this.state.bill.id+' - '+this.state.bill.amount
        )}
      </>
    );
  }
}
