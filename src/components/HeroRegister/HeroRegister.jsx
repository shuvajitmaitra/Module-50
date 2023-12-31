import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroRegister = () => {
  const [success, setSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleSubmitButton = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.terms.checked;
    console.log("button clicked,", name, email, password, checkbox);

    setSuccess(false);
    setRegisterError(false);

    if (password.length < 6) {
      setRegisterError("password should be more than 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password should have at least one uppercase character");
      return;
    } else if (!checkbox) {
      setRegisterError("Please check the terms and conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // profile update.............
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            alert("your profile updated");
          })
          .catch((error) => {
            setRegisterError(error.message);
          });

        // send verification email.................
        sendEmailVerification(result.user).then(() => {
          alert("please check your email to verify you account");
        });
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmitButton}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name..."
                    name="name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label relative ">
                    <span className="label-text">Password</span>
                    <span
                      className="absolute right-3 top-[52px]"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="">
                  <input type="checkbox" name="terms" id="terms" />
                  <label htmlFor="terms" className="label-text-alt">
                    {" "}
                    check the
                    <a href="#" className="label-text-alt link link-hover">
                      terms and conditions
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
                </div>
                {success && (
                  <p className="text-green-600">Your Registration successful</p>
                )}
                {registerError && (
                  <p className="text-red-600"> {registerError} </p>
                )}
                <p>
                  already have an account <Link to={"/login"}>Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
