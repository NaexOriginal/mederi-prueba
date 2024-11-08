import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { Notification, showSuccessToast, showErrorToast } from '../components/Notification';

import axios from 'axios';

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const url = `${import.meta.env.VITE_HOST}/api/auth/login`;
      const response = await axios.post(url, {username, password}, {withCredentials: true});

      if(response.status == 200) {
        showSuccessToast(response.data.message)

        setTimeout(() => {
          navigate('/Dashboard'); 
        }, 3000)
      }

    } catch(err) {
      showErrorToast(err.response?.data?.error || 'Error al iniciar sesión');
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <Notification />
      <div className="">
        <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>        

        <form onSubmit={ handleLogin }>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Usuario
            </label>
            <input 
              type="text" 
              id="username"
              className="w-full border border-gray-500 rounded-sm focus:ring"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="password"
            >
              Contraseña
            </label>
            <input 
              type="password"
              id="password"
              className="w-full border border-gray-500 rounded-sm focus:ring"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

        <button 
          className="w-full p-2 rounded bg-[#F05A03] text-white font-semibold hover:bg-[#F86A17]"
        >
          Iniciar Sesión
        </button>
        </form>

        <p className="mt-4 text-center">
          ¿No tienes cuenta? <Link to="/SignUp" className="text-blue-700 hover:underline">Registrate</Link>
        </p>
      </div>
    </main>
  )
}
