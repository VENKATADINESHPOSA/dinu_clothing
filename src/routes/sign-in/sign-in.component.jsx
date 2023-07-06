import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const { user } = response;
    await createUserDocumentFromAuth(user);
  };
  return (
    <>
      <div>
        <h1>sign-in Page</h1>
        <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      </div>
      <SignUpForm />
    </>
  );
};

export default SignIn;
