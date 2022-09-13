import React, { Component } from "react";
import { Formik } from "formik";

export default class login extends Component {
  submit = (values, actions) => {
    console.log(values);
    setTimeout(() => {
      actions.isSubmitting = false;
      actions.resetForm();
    }, 1000);
  };
  validate = (values) => {
    let errors = {};
    if (values.name && values.name.length < 3) {
      errors.name = "Nom trop court";
    }
    return errors;
  };

  render() {
    return (
      <div
        className="container-fluid p-5
d-flex flex-column justify-content-center align-items-center"
      >
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
                  username="name"
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
    );
  }
}
