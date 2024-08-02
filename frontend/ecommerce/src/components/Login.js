import { useContext, useState } from "react";
import { login } from "../network/network";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context";

export default function Login() {
  const [newLogin, setNewLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { state, setState } = useContext(GlobalContext);

  const validateEmail = (email) => {
    // Basic email format validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    // Check if password meets minimum length
    return password.length >= 3; // Adjust as needed
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const { email, password } = newLogin;
    let validationErrors = {};

    // Validate fields if not empty
    if (email && !validateEmail(email)) {
      validationErrors.email = "Invalid email address";
    }
    if (password && !validatePassword(password)) {
      validationErrors.password = "Password must be at least 4 characters long";
    }

    // Set error messages and return if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log("Login clicked");
      const res = await login(email, password);
      console.log("res from login function", res);

      if (res && res.success) {
        localStorage.setItem("user", JSON.stringify(res)); // Convert to JSON string
        setState({ ...state, user: res });
        console.log("Inside if in login, before navigation");
        navigate("/");
      } else {
        const errorMessage =
          res && res.error
            ? res.error
            : "Login failed. Invalid email or password.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Login failed. Please try again.");
    }
  };

  const goToSignup = () => {
    console.log("Signup hit");
    navigate("/signup");
  };

  const setLoginDetails = (e) =>
    setNewLogin({ ...newLogin, [e.target.name]: e.target.value });

  return (
    <div>
      <h1>Login</h1>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div>
            <input
              placeholder="email"
              type="email"
              name="email"
              value={newLogin.email}
              onChange={setLoginDetails}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <input
              placeholder="password"
              type="password"
              name="password"
              value={newLogin.password}
              onChange={setLoginDetails}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <input type="submit" value="login" className="button" />
        </form>
        <p>Don't have an account? </p>
        <button onClick={goToSignup}>Signup</button>
      </div>
    </div>
  );
}
