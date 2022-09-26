import React, { Component } from "react";
import { Formik, Field } from "formik";
import apiBni from "../../conf/axios/api.bni";
import { Loading, Alert } from "../../components/utils";
import * as Yup from "yup";

export default class ItemNew extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null, messageColor:null, loaded: false};
  }

  //validation du login
  submit = (values, actions) => {
    this.setState({ message: null, loaded: true });

    //creation de la requete
    apiBni
      .post("/items", values, {})
      .then((response) => {
        if (response.status === 201) {
            this.setState({
                message: "Item crée avec succès",
                messageColor: "success",
                loaded: false,
            });
        // actions.resetForm();
        }
      })
      //si erreur on update le state pour mettre un message d'erreur
      .catch((err) => {
        this.setState({
            message: err.response.data.message,
            messageColor: "alert",
            loaded: false,
        });
        actions.isSubmitting = false;
      });
  };

  //validation des données
  itemSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Prénom trop court').required('Veuillez indiquer un prénom'),
    priceOf: Yup.string().matches(/^\d+(.\d{1,2})?$/, 'Format invalide')
});

  render() {
    //on affiche le formulaire
    return (
      <>
        {console.log(this.dateDay)}
        {this.state.loaded ? (
          <Loading />
        ) : (
          <div className="container-fluid p-5 d-flex flex-column justify-content-center align-items-center">
            {/* affichage du message d'erreur */}
            {this.state.message && (
              <Alert message={this.state.message} color={this.state.messageColor} />
            )}

            <Formik
              onSubmit={this.submit}
              initialValues={{ name: "", priceOf: ""}}
              validationSchema = { this.itemSchema }
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
                    <label>Nom</label>
                    <Field
                      name="name"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Prix</label>
                    <Field
                      name="priceOf"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.priceOf}
                    />
                    {errors.priceOf && touched.priceOf && (
                      <div className="text-danger">{errors.priceOf}</div>
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
