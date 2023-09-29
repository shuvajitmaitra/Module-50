import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const emailRef = useRef(null);

  const handleSubmitBtn = (e) => {
    e.preventDefault();

    setLoginError(false);
    setSuccess(false);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.terms.checked;

    console.log(checkbox);
    // console.log(email, password);
    if (!checkbox) {
      setLoginError("please check term and condition");
      return;
    }
    console.log(loginError);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setSuccess("Login successful");
        } else {
          sendEmailVerification(result.user).then(() => {
            alert("please check your email to verify you account");
          });
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoginError(true);
      });

    // forget password .................
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      return alert("please provide an email");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      return alert("please provide real email address");
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };
  return (
    <div className="lg:w-1/2 mx-auto p-5 md:p-10">
      <form onSubmit={handleSubmitBtn}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></input>
          <label className="label">
            <a
              onClick={handleForgetPassword}
              href="#"
              className="label-text-alt link link-hover"
            >
              Forgot password?
            </a>
          </label>
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            ></input>
          </div>

          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Check the terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        {success && <p> {success} </p>}
        {loginError && <p> {loginError} </p>}
        <p>
          If you are new then <Link to={"/heroRegister"}>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
