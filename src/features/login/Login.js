import React, { Component } from "react";
import { Formik } from "formik";
import { Navigate } from 'react-router-dom';
import apiBni from "../../conf/axios/api.bni";
import cookies from 'js-cookie';
import {Loading} from '../../components/utils';
import { $CombinedState } from "redux";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { errorMessage: null, loaded: false, auth:false };
  }
  
  //validation du login
  submit = (values, actions) => {
    this.setState({errorMessage:null, loaded:true})
    apiBni
      .post("/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          cookies.set('BEARER', response.data.token, { sameSite:'strict' });
          this.setState({auth:true})
        }
      })
      //si login pas valide on update le state pour mettre un message d'erreur
      .catch((err) => {
        this.setState({ errorMessage: err.response.data.message, loaded:false });
        actions.isSubmitting = false;
        actions.resetForm();
      }
      );
  };  

  //validation des données
  validate = (values) => {
    let errors = {};
    if (values.name && values.name.length < 3) {
      errors.name = "Nom trop court";
    }
    return errors;
  };

  render() {
    //si authentifié, on redirige vers /
    if(this.state.auth){
      return <Navigate to="/" />
    }
    //sinon on affiche le formulaire
    return (
      <>
      { this.state.loaded ? <Loading />: (
      <div className="container-fluid p-5 d-flex flex-column justify-content-center align-items-center">
        {/* affichage du message d'erreur */}
        { 
        this.state.errorMessage &&
          <div className="alert alert-danger" role="alert">
            { this.state.errorMessage }
          </div>
        }

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
