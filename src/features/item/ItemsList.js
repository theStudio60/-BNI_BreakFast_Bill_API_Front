import { Component } from "react";
import apiBni from "../../conf/axios/api.bni";
import { Loading, Alert } from "../../components/utils";
import { NavLink } from "react-router-dom";

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: null, errorMessage: null, loaded: true };
  }

  componentDidMount() {
    apiBni
      .get("/items?page=1&itemsPerPage=10", {})
      .then((response) => {
        if (response.status === 200) {
          const items = response.data;
          this.setState({ items: items, loaded: false });
        }
      })
      //si erreur on update le state pour mettre un message d'erreur
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
        {this.state.loaded || this.state.items === null ? (
          <Loading />
        ) : (
          this.state.items["hydra:member"].map((item, index) => (
            <NavLink to={ "/item/"+item.id } className="nav-link" key={item.id}>{item.name}</NavLink>
          ))
        )}
      </>
    );
  }
}
