import { Component } from "react";
import apiBni from "../../../conf/axios/api.bni";
import { Loading, Alert } from "../../../components/utils";
import { NavLink } from "react-router-dom";

export default class SessionsList extends Component {
  constructor(props) {
    super(props);
    this.state = { session: null, errorMessage: null, loaded: true };
  }

  componentDidMount() {
    apiBni
      .get("/sessions?page=1&itemsPerPage=30", {})
      .then((response) => {
        if (response.status === 200) {
          const session = response.data;
          this.setState({ session: session, loaded: false });
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
        {this.state.loaded || this.state.session === null ? (
          <Loading />
        ) : (
          this.state.session["hydra:member"].map((session, index) => (
            <NavLink to={ "/session/"+session.id } className="nav-link" key={session.id}>{session.session_type.name}</NavLink>
          ))
        )}
      </>
    );
  }
}
