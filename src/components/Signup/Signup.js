import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGoogleAuthData,
  signUp,
  signIn,
} from "../../redux/actions/authActions";
import firebase from "firebase";
import { useForm } from "react-hook-form";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export const Signup = () => {
  const [active, setActive] = useState("signUp");
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.authError);

  // only for google auth
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(getGoogleAuthData(user));
      }
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    let user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    if (active === "signUp") {
      dispatch(signUp(user));
    } else {
      dispatch(signIn(user));
    }
  };

  return (
    <div className="mt-20 px-4 py-6 bg-white shadow-lg max-w-xl mx-auto ">
      <div className="flex items-center justify-center space-x-2 mt-4 font-bold text-xl">
        <span>{active === "signUp" ? "Join Us Today" : "Welcome back"}</span>
      </div>
      <div className="mt-4 w-full border-b border-gray-300">
        <button
          type="button"
          className={
            "py-1 border-b border-transparent focus:outline-none " +
            (active === "logIn" && "border-blue-500 text-blue-500")
          }
          onClick={() => {
            dispatch({ type: "REMOVE_ERROR" });
            setActive("logIn");
          }}
        >
          Log In
        </button>
        <button
          type="button"
          className={
            "ml-4 py-1 border-b border-transparent focus:outline-none " +
            (active === "signUp" && "border-blue-500 text-blue-500")
          }
          onClick={() => {
            dispatch({ type: "REMOVE_ERROR" });
            setActive("signUp");
          }}
        >
          Sign Up
        </button>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {active === "signUp" ? (
            <SignUpForm register={register} errors={errors} />
          ) : (
            <LogInForm register={register} errors={errors} />
          )}

          {/* error from database, like "User already exists" */}
          {authError && <div className="mt-2 text-red-500">{authError}</div>}
          <button className="submit-btn">Submit</button>
        </form>
      </div>

      {/* google auth */}
      <div className="mt-4 mx-auto">
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: "popup",
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
              signInSuccessWithAuthResult: () => false,
            },
          }}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
};

function DefaultFields({ register, errors }) {
  return (
    <>
      <label className="mt-5 block w-full" htmlFor="email">
        <div className="font-medium text-sm"> Email</div>

        <input
          className="mt-2 form-input w-full"
          type="email"
          id="email"
          name="email"
          ref={register({
            required: { value: true, message: "This field is required" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.email?.message}</span>
      </label>
      <label className="mt-5 block w-full" htmlFor="password">
        <div className="font-medium text-sm"> Password</div>
        <input
          className="mt-2 form-input w-full"
          type="password"
          id="password"
          name="password"
          ref={register({
            required: { value: true, message: "This field is required" },
            minLength: { value: 5, message: "Min characters - 5" },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.password?.message}</span>
      </label>
    </>
  );
}

function SignUpForm({ register, errors }) {
  return (
    <>
      <DefaultFields register={register} errors={errors} />
      <label className="mt-5 block w-full" htmlFor="firstName">
        <div className="font-medium text-sm">First Name</div>
        <input
          className="mt-2 form-input w-full"
          type="text"
          id="firstName"
          name="firstName"
          ref={register({
            required: { value: true, message: "This field is required" },
            minLength: { value: 2, message: "Min characters - 2" },
            maxLength: { value: 25, message: "Max characters - 25" },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.firstName?.message}</span>
      </label>
      <label className="mt-5 block w-full" htmlFor="lastName">
        <div className="font-medium text-sm">Last Name</div>
        <input
          className="mt-2 form-input w-full"
          type="text"
          id="lastName"
          name="lastName"
          ref={register({
            required: { value: true, message: "This field is required" },
            minLength: { value: 2, message: "Min characters - 2" },
            maxLength: { value: 25, message: "Max characters - 25" },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.lastName?.message}</span>
      </label>
    </>
  );
}

function LogInForm({ register, errors }) {
  return <DefaultFields register={register} errors={errors} />;
}
