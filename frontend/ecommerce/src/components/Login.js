import { useContext, useState } from "react";
import { login } from "../network/network";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context";

export default function Login(e) {
  const [newLogin, setNewLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { state, setState } = useContext(GlobalContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(newLogin.email, newLogin.password);

      if (res && res.success) {
        localStorage.setItem("user", res.token);
        setState({ ...state, user: res.token });
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
    navigate("/signup");
  };
  const setLoginDetails = (e) =>
    setNewLogin({ ...newLogin, [e.target.name]: e.target.value });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          placeholder="email"
          type="email"
          name="email"
          onChange={setLoginDetails}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          onChange={setLoginDetails}
        />
        <input type="submit" value="login" />
      </form>
      <p>Don't have an account? </p>
      <button onClick={goToSignup}>Signup</button>
    </div>
  );
}
