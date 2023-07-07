import { useState } from "react";
import "./sign-in-form.styles.scss";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    const { user } = response;
    await createUserDocumentFromAuth(user);
  };

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
    try {
      const userstatus = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log("userStatus", userstatus);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
