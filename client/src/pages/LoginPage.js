import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  // const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const userInfo = await response.json();
        console.log(userInfo);
        setUserInfo(userInfo);
        setRedirect(true);

        // } else if (response.status != 200) {
        //   setHidden(true);

      }
      else {
        const errorMessage = await response.text();
        alert(errorMessage || 'Wrong credentials');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)} />
      <input type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)} />
      <button>Login</button>
      {/* <p style={{ color: 'red' }} hidden={!hidden}>Utilisateur non trouvé, veuillez vous inscrire</p> */}
    </form >

  );
}