import React, { Component } from "react";
import { Formik } from "formik";
import { Navigate } from "react-router-dom";
import * as axios from "axios";
import cookies from "js-cookie";
import { Loading, Alert } from "../../components/utils";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: null, loaded: false, auth: false };
  }

  //validation du login
  submit = (values, actions) => {
    this.setState({ errorMessage: null, loaded: true });

    //creation de la requete
    const requete = axios.create({
      baseURL: process.env.REACT_APP_SERVER_NAME + "/api",
    });
    requete
      .post("/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // création du cookie
          cookies.set("BEARER", response.data.token, { sameSite: "strict", expires: new Date(new Date().getTime() + 5 * 60 * 1000) }); //5minutes
          this.setState({ auth: true });
          //on raffraichit la page pour éviter le bug du cookie pas valide
          window.location.reload();
        }
      })
      //si login pas valide on update le state pour mettre un message d'erreur
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.message,
          loaded: false,
        });
        actions.isSubmitting = false;
        actions.resetForm();
      });
  };

  //validation des données
  validate = (values) => {
    let errors = {};
    if (!values.username && values.username.length < 3) {
      errors.username = "Nom trop court";
    }
    if (!values.password) {
      errors.password = "Veuillez inserer un mot de passe";
    }
    return errors;
  };

  render() {
    //si authentifié, on redirige vers /
    if (this.state.auth) {
      return <Navigate to="/" />;
    }
    //sinon on affiche le formulaire
    return (
      <>
        {this.state.loaded ? (
          <Loading />
        ) : (
          <div className="container-fluid p-5 d-flex flex-column justify-content-center align-items-center">
            {/* affichage du message d'erreur */}
            {this.state.errorMessage && (
              <Alert message={this.state.errorMessage} color="danger" />
            )}

            <Formik
              onSubmit={this.submit}
              initialValues={{ username: "", password: "" }}
              validate={this.validate}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                errors,
                touched,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border p-5 d-flex flex-column"
                >
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    {errors.username && touched.username && (
                      <div className="text-danger">{errors.username}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}                    
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Envoyer
                  </button>
                </form>
              )}
            </Formik>
          </div>
        )}
      </>
    );
  }
}
