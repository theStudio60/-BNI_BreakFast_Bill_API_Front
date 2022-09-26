import { Component } from "react";
import apiBni from "../../../conf/axios/api.bni";
import { Loading, Alert } from "../../../components/utils";
import { NavLink } from "react-router-dom";

export default class SessionTypesList extends Component {
  constructor(props) {
    super(props);
    this.state = { sessionsType: null, errorMessage: null, loaded: true };
  }

  componentDidMount() {
    apiBni
      .get("/session_types?page=1&itemsPerPage=30", {})
      .then((response) => {
        if (response.status === 200) {
          const sessionsType = response.data;
          this.setState({ sessionsType: sessionsType, loaded: false });
        }
      })
      //si sessionPlace pas valide on update le state pour mettre un message d'erreur
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
        {this.state.loaded || this.state.sessionsType === null ? (
          <Loading />
        ) : (
          this.state.sessionsType["hydra:member"].map((sessionType, index) => (
            <NavLink to={ "/session-type/"+sessionType.id } className="nav-link" key={sessionType.id}>{sessionType.name}</NavLink>
          ))
        )}
      </>
    );
  }
}
