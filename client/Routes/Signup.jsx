import React from "react";
import "../Stylesheets/Signup.css";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../src/firebase'; // Importing auth from firebase.js

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Google Login Handler
  const handleGoogleLogin = (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google Login Success:", user);
        // Handle user information and redirection here
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
      });
  };

  // Handle form submission for email/password sign-up
  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user);
      // Handle user information and redirection here
    } catch (error) {
      console.error("Error code:", error.code, "Message:", error.message);
    }
  };

  return (
    <>
      <form className="form-submit" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-wrapper">
          <div className="form-content">
            <div className="back-btn-wrapper">
              <button className="back-btn">
                <svg height="16" width="16" fill="#a4f23c" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                  <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                </svg>
                <span>Back</span>
              </button>
            </div>
            <div className="heading">
              <h1>Create an Account</h1>
            </div>
            <div className="google-auth-wrapper">
              <button className="google-auth-btn" onClick={handleGoogleLogin}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262">
                  <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                  <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                  <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                  <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                </svg>
                Continue with Google
              </button>
            </div>
            <div className="separator">
              <div className="line"></div>
              <div className="or-text">OR</div>
              <div className="line"></div>
            </div>
            <div className="elements-wrapper">
              <div className="input-group-1">
                <label>
                  <input
                    placeholder=""
                    type="text"
                    className="input-email"
                    {...register("email", { required: false, maxLength: 50 })}
                  />
                  <span>Enter Email</span>
                  {errors.email && <span className="invalid-email-error">Please Enter Valid Email Address</span>}
                </label>
              </div>
              <div className="input-group-2">
                <label>
                  <input
                    required
                    placeholder=""
                    type="password"
                    className="input-passwd"
                    {...register("password", { required: false, minLength: 6 })}
                  />
                  <span>Enter Password</span>
                  {errors.password && <span className="minLength-password-error">Password Should Be 6 Characters Long</span>}
                </label>
              </div>
            </div>
            <div className="btn-wrapper">
              <button type="submit" className="signup-btn">Create an Account</button>
            </div>
            <div className="terms-wrapper">
              <p className="terms">
                By continuing, you agree to Anom's <strong>Terms of Use</strong> and <strong>Privacy Policy.</strong>
              </p>
              <p className="login-txt">
                Already have an account? <a href="#">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
