import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const {user} = response;
    const userDocRef = createUserDocumentFromAuth(user);
    console.log(userDocRef);

  };
  return (
    <div>
      <h1>sign-in Page</h1>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
    </div>
  );
};

export default SignIn;
