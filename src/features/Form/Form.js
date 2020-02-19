import React from "react";
import { useFormik } from "formik";
import { Form, Input, Label, Text, Button} from "../../theme";
import Select from "./components/Select";
import { Checkbox as SemanticCheckBox } from "semantic-ui-react";
import './styles.scss';

const Checkbox = props => <SemanticCheckBox {...props} />;

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

const options = [
  { value: "Spiderman", label: "Spiderman" },
  { value: "Hulk", label: "Hulk" },
  { value: "Iron Man", label: "Iron Man" },
  { value: "Thor", label: "Thor" }
];

const SignupForm = props => {
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
    <Form onSubmit={formik.handleSubmit} className="character-form">
      <Label>
        Favorite Character
        <Select
          width="300px"
          options={options}
          multi={true}
          onChange={({ value }) =>
            formik.setFieldValue("charcterName", value, false)
          }
          onBlur={formik.setFieldTouched}
          value={formik.values.food}
        />
      </Label>
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
      <Checkbox
        name="makePrivate"
        className="profile-checkbox"
        label="Make me Private"
        onChange={(e, { name, checked }) =>
          formik.setFieldValue(name, checked, false)
        }
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
export default SignupForm;
