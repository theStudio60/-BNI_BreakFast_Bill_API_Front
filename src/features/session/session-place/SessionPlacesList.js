import { Component } from "react";
import apiBni from "../../../conf/axios/api.bni";
import { Loading, Alert } from "../../../components/utils";
import { NavLink } from "react-router-dom";

export default class SessionPlacesList extends Component {
  constructor(props) {
    super(props);
    this.state = { sessionsPlace: null, errorMessage: null, loaded: true };
  }

  componentDidMount() {
    apiBni
      .get("/session_places?page=1&itemsPerPage=30", {})
      .then((response) => {
        if (response.status === 200) {
          const sessionsPlace = response.data;
          this.setState({ sessionsPlace: sessionsPlace, loaded: false });
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
        {this.state.loaded || this.state.sessionsPlace === null ? (
          <Loading />
        ) : (
          this.state.sessionsPlace["hydra:member"].map((sessionPlace, index) => (
            <NavLink to={ "/session-place/"+sessionPlace.id } className="nav-link" key={sessionPlace.id}>{sessionPlace.zip_code+' '+sessionPlace.city}</NavLink>
          ))
        )}
      </>
    );
  }
}
