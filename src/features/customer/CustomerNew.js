import React, { Component } from "react";
import { Formik, Field, isInteger } from "formik";
import apiBni from "../../conf/axios/api.bni";
import { Loading, Alert } from "../../components/utils";
import * as Yup from "yup";

export default class CustomerNew extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null, messageColor:null, loaded: false};
  }

  //validation du login
  submit = (values, actions) => {
    this.setState({ message: null, loaded: true });

    //creation de la requete
    apiBni
      .post("/customers", values, {})
      .then((response) => {
        if (response.status === 201) {
            this.setState({
                message: "Client crée avec succès",
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
  customerSchema = Yup.object().shape({
    firstname: Yup.string().min(3, 'Prénom trop court').required('Veuillez indiquer un prénom'),
    lastname: Yup.string().min(3, 'Nom trop court').required('Veuillez indiquer un nom'),
    street: Yup.string().min(3, 'Nom de rue trop court').required('Veuillez indiquer un nom de rue'),
    streetNumber: Yup.string().min(1, 'Veuillez indiquer un numéro de rue'),
    zipCode: Yup.number().min(1000, 'Le code zip doit être de min 4 chiffres').max(9999, 'Le code zip doit être de max 4 chiffre').required('Veuillez indiquer un code postal'),
    city: Yup.string().min(3, 'Nom de ville trop court').required('Veuillez indiquer une ville'),
    company: Yup.string().min(3, 'Nom entreprise trop court').required('Veuillez indiquer une entreprise'),
    email: Yup.string().email(3, 'Email non valide').required('Veuillez indiquer un email'),
    memberShip_at: Yup.string().matches(/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d$/, 'Format dd.mm.yyyy')
});

  render() {
    //on affiche le formulaire
    return (
      <>
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
              initialValues={{ firstname: "", lastname: "", street: "", streetNumber: "", zipCode: "", city: "", company: "", email: "", memberShip_at: "25.08.2022" }}
              validationSchema = { this.customerSchema }
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
                    <label>Prénom</label>
                    <Field
                      name="firstname"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstname}
                    />
                    {errors.firstname && touched.firstname && (
                      <div className="text-danger">{errors.firstname}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Nom</label>
                    <Field
                      name="lastname"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                    />
                    {errors.lastname && touched.lastname && (
                      <div className="text-danger">{errors.lastname}</div>
                    )}
                  </div>      
                  <div className="form-group">
                    <label>Rue</label>
                    <Field
                      name="street"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.street}
                    />
                    {errors.street && touched.street && (
                      <div className="text-danger">{errors.street}</div>
                    )}
                  </div>  
                  <div className="form-group">
                    <label>Numéro de rue</label>
                    <Field
                      name="streetNumber"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.streetNumber}
                    />
                    {errors.streetNumber && touched.streetNumber && (
                      <div className="text-danger">{errors.streetNumber}</div>
                    )}
                  </div>          
                  <div className="form-group">
                    <label>Code postal</label>
                    <Field
                      type="number"
                      name="zipCode"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zipCode}
                    />
                    {errors.zipCode && touched.zipCode && (
                      <div className="text-danger">{errors.zipCode}</div>
                    )}
                  </div>       
                  <div className="form-group">
                    <label>Ville</label>
                    <Field
                      name="city"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                    />
                    {errors.city && touched.city && (
                      <div className="text-danger">{errors.city}</div>
                    )}
                  </div>         
                  <div className="form-group">
                    <label>Entreprise</label>
                    <Field
                      name="company"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.company}
                    />
                    {errors.company && touched.company && (
                      <div className="text-danger">{errors.company}</div>
                    )}
                  </div>    
                  <div className="form-group">
                    <label>Email</label>
                    <Field
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>          
                  <div className="form-group">
                    <label>Membre depuis</label>
                    <Field
                      name="memberShip_at"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.memberShip_at}
                    />
                    {errors.memberShip_at && touched.memberShip_at && (
                      <div className="text-danger">{errors.memberShip_at}</div>
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
