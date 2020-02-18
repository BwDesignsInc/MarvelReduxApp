import React from "react";
import { useFormik } from "formik";
import { Form, Input, Title, Label, Text, Button } from "../../theme";

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: ""
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Label>
        First Name
        <Input
          border={formik.errors.firstName && "1px solid red"}
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
      </Label>
      <Label>
        Last Name*
        <Input
          border={formik.errors.lastName && "1px solid red"}
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
      </Label>
      <Label>
        Email *
        {formik.errors.email && <Text color="red">{formik.errors.email}</Text>}
        <Input
          border={formik.errors.email && "1px solid red"}
          type="text"
          name="email"
          onChange={formik.handleChange}
          placeholder="Email"
        />
      </Label>
      <Button type="submit">Submit</Button>
    </Form>
  );
};
export default SignupForm;
