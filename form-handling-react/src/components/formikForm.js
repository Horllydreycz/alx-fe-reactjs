import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Submitted values:", values);
        alert("Form submitted successfully!");
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label>
            Username:
            <Field type="text" name="username" />
          </label>
          <ErrorMessage
            name="username"
            component="div"
            style={{ color: "red" }}
          />

          <br />

          <label>
            Email:
            <Field type="email" name="email" />
          </label>
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />

          <br />

          <label>
            Password:
            <Field type="password" name="password" />
          </label>
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />

          <br />

          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
