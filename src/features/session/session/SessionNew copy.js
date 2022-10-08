import React, { Component } from "react";
import { Formik, Field } from "formik";
import apiBni from "../../../conf/axios/api.bni";
import { Loading, Alert } from "../../../components/utils";
import * as Yup from "yup";
import DateTimePicker from "react-datetime-picker";

export default class SessiontypeNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      messageColor: null,
      loaded: true,
      sessionTypeListOption: [],
      dateTimePicker: new Date(),
    };
  }

  //validation du formulaire
  submit = (values, actions) => {
    this.setState({ message: null, loaded: true });

    //creation de la requete
    apiBni
      .post("/sessions", values, {})
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            message: "Session crée avec succès",
            messageColor: "success",
            loaded:false
          });
          // actions.resetForm();
        }
      })
      //si erreur on update le state pour mettre un message d'erreur
      .catch((err) => {
        this.setState({
          message: err.response.data.message,
          messageColor: "danger",
          loaded: false,
        });
        actions.isSubmitting = false;
      });
  };

  componentDidMount() {
    //récupération des sessionTypes
    apiBni
      .get("/session_types", {})
      .then((response) => {
        if (response.status === 200) {
          const options = response.data["hydra:member"].map((sessionType) => ({
            value: sessionType.id,
            name: sessionType.name
          }
          ));
          this.setState({ sessionTypeListOption: options, loaded: false });
        }
      })
      //si sessionType pas valide on update le state pour mettre un message d'erreur
      .catch((err) => {
        this.setState({ message: err.message, loaded: false });
      });
  }

  //validation des données
  SessionSchema = Yup.object().shape({
    dayAt: Yup.string().matches(/^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[012]).(19|20)\d\d[\s](0[0-9]|1[0-9]|2[0-4]):(0[0-9]|[12345][0-9]):(0[0-9]|[12345][0-9])$/, 'Format dd.mm.yyyy hh:mm:ss').required('Date Requise'),
    toDone: Yup.number().min(0).max(1),
    sessionType_id: Yup.number().min(1)
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
              <Alert
                message={this.state.message}
                color={this.state.messageColor}
              />
            )}

            <Formik
              onSubmit={this.submit}
              initialValues={{
                dayAt: "",
                toDone: 1,
                sessionType_id: "",
              }}
              validationSchema={this.SessionSchema}
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
                    <label>Jour et heure</label>
                    <DateTimePicker
                      name="dayAt"
                      className="form-control"
                      onChange={this.setState({})}
                      onBlur={handleBlur}
                      value={this.state.dateTimePicker}
                    />
                    {errors.dayAt && touched.dayAt && (
                      <div className="text-danger">{errors.dayAt}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>A lieu ?</label>
                    <Field
                      as="select"
                      name="toDone"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.toDone}
                    >
                      <option value={1}>Oui</option>
                      <option value={0}>Non</option>
                    </Field>
                    {errors.toDone && touched.toDone && (
                      <div className="text-danger">{errors.toDone}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Type de session</label>
                    <Field
                      as="select"
                      name="sessionType_id"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option key="0" value="0">Veuillez selectionner</option>
                      {this.state.sessionTypeListOption.map((s) => {
                        return <option key={s.value} value={s.value}>{s.name}</option>;
                      })}
                    </Field>
                    {errors.sessionPlace_id && touched.sessionPlace_id && (
                      <div className="text-danger">
                        {errors.sessionPlace_id}
                      </div>
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
