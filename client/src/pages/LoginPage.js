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
      const response = await fetch('http://localhost:4000/login', {
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

    <div class="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto md:py-0">


      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

          <form class="space-y-4 md:space-y-6" onSubmit={login}>
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>

            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
              <input type="text"
                placeholder="username"
                value={username}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={ev => setUsername(ev.target.value)} />
            </div>

            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <button class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
            {/* <p style={{ color: 'red' }} hidden={!hidden}>Utilisateur non trouvé, veuillez vous inscrire</p> */}
          </form >

        </div>
      </div>
    </div>
  );
}