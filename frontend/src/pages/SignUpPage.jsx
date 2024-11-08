import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Notification, showSuccessToast, showErrorToast } from '../components/Notification';

import axios from 'axios';

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const url = `${import.meta.env.VITE_HOST}/api/auth/register`;
      const response = await axios.post(url, { username, password, email }, { withCredentials: true });

      if (response.status === 201) {
        showSuccessToast(response.data.message);

        setTimeout(() => {
          navigate('/');
        }, 3000);
      }

    } catch (err) {
      showErrorToast(err.response?.data?.error || 'Error en el registro');
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <Notification />
      <div className="">
        <h2 className="text-2xl font-semibold mb-4">Registrarse</h2>

        <form onSubmit={handleRegister}>
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

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-500 rounded-sm focus:ring"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-500 rounded-sm focus:ring"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full p-2 rounded bg-[#F05A03] text-white font-semibold hover:bg-[#F86A17]">
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta? <Link to="/" className="text-blue-700 hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </main>
  );
};
