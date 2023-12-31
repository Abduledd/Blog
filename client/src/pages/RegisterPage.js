import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      alert('registration succesfull')
    } else {
      alert('register failed')
    }
  }
  return (
    <div class="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto md:py-0">


      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

          <form class="space-y-4 md:space-y-6" onSubmit={register}>
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register
            </h1>

            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
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

            <button class="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <Link to="/login" class="font-medium text-gray-600 hover:underline dark:text-primary-500">Login here</Link>
            </p>
            {/* <p style={{ color: 'red' }} hidden={!hidden}>Utilisateur non trouvé, veuillez vous inscrire</p> */}
          </form >

        </div>
      </div>
    </div>

    // <form className="register" onSubmit={register}>
    //   <h1>Register</h1>
    //   <input type="text"
    //     placeholder="username"
    //     value={username}
    //     onChange={ev => setUsername(ev.target.value)} />
    //   <input type="password"
    //     placeholder="password"
    //     value={password}
    //     onChange={ev => setPassword(ev.target.value)} />
    //   <button>Register</button>
    // </form>
  );
}