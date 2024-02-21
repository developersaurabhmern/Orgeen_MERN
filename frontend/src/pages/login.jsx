import React, { useState, useEffect, useContext } from "react";
import { MyValidator } from "../utils/MyValidator";
import { validatorsMethods } from "../utils/validatorsMethods";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../utils/user.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validEmail = await MyValidator(email, "Email", (a, b) => {
      validatorsMethods
        .start(a, b)
        .isRequired()
        .email();
    });

    const validPassword = await MyValidator(password, "Password", (a, b) => {
      validatorsMethods
        .start(a, b)
        .isRequired()
        .strMin(8);
    });

    if (validEmail?.field) {
      console.log(validEmail.message);
      return;
    }

    if (validPassword?.field) {
      console.log(validPassword.message);
      return;
    }
    // console.log(email, ' ', password);
    axios
      .post("http://localhost:3001/api/user/login", { email, password })
      .then((res) => {
        const token = res.data.token;
        // dispatch({ type: "LOGGED_IN", payload: { token } });
        login(token);
        navigate("/dashboard");
      })

      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };
  return (
    <>
      <div className="login-34">
        <div className="container">
          <div className="row login-box">
            <div className="col-lg-6 bg-color-15 pad-0 none-992"></div>
            <div className="col-lg-6 pad-0 form-info">
              <img src="assets/img/logo.png" alt="bg" className="img-fluid" />
              <div className="form-section align-self-center">
                <h3 className="mb-1">Sign Into Your Account</h3>

                {errorMessage && (
                  <div
                    class="alert alert-danger alert-dismissible fade show"
                    role="alert"
                    style={{ padding: "10px" }}
                  >
                    <strong>{errorMessage}</strong>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      style={{
                        float: "right",
                        background: "none",
                        border: "none",
                      }}
                      onClick={() => setErrorMessage("")}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}

                <form action="#" onSubmit={handleSubmit}>
                  <div className="form-group form-box">
                    <label for="first_field" className="form-label">
                      Email address
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="first_field"
                      placeholder="Email Address"
                      aria-label="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group form-box">
                    <label for="second_field" className="form-label">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      autocomplete="off"
                      id="second_field"
                      placeholder="Password"
                      aria-label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="checkbox form-group form-box">
                    <div className="form-check checkbox-theme">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="rememberMe"
                      />
                      <label className="form-check-label" for="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a
                      href="forgot-password-34.html"
                      className="forgot-password"
                    >
                      Forgot Password
                    </a>
                  </div>
                  <div className="form-group clearfix">
                    <button type="submit" className="btn-md btn-theme w-100">
                      Login
                    </button>
                  </div>
                </form>
                <p>Help & Support</p>
                <div className="social-list">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-google"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
