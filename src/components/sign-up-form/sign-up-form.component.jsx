import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setFormFields((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = formFields;
    if (password !== confirmPassword) {
      alert("passwords doesnot match");
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Display Name"
          inputOptions={{
            required: true,
            type: "text",
            name: "displayName",
            value: displayName,
            onChange: changeHandler,
          }}
        />
        <FormInput
          label="Email"
          inputOptions={{
            required: true,
            type: "email",
            name: "email",
            value: email,
            onChange: changeHandler,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            required: true,
            type: "password",
            name: "password",
            value: password,
            onChange: changeHandler,
          }}
        />
        <FormInput
          label="Confirm Password"
          inputOptions={{
            required: true,
            type: "password",
            name: "confirmPassword",
            value: confirmPassword,
            onChange: changeHandler,
          }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
