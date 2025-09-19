'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState<{ username?: boolean; password?: boolean }>({});
  const router = useRouter();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    // Validaciones para el usuario
    if (!username.trim()) {
      newErrors.username = 'El usuario es requerido';
    } else if (username.length < 2) {
      newErrors.username = 'El usuario debe tener al menos 2 caracteres';
    } else if (username.length > 50) {
      newErrors.username = 'El usuario no puede tener más de 50 caracteres';
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
      newErrors.username = 'El usuario solo puede contener letras, números, guiones, puntos y guiones bajos';
    } else if (username.startsWith(' ') || username.endsWith(' ')) {
      newErrors.username = 'El usuario no puede empezar o terminar con espacios';
    }

    // Validaciones para la contraseña
    if (!password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 3) {
      newErrors.password = 'La contraseña debe tener al menos 3 caracteres';
    } else if (password.length > 128) {
      newErrors.password = 'La contraseña no puede tener más de 128 caracteres';
    } else if (password.includes(' ')) {
      newErrors.password = 'La contraseña no puede contener espacios';
    } else if (!/^(?=.*[a-zA-Z])/.test(password)) {
      newErrors.password = 'La contraseña debe contener al menos una letra';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (fieldName: 'username' | 'password', value: string) => {
    const newErrors = { ...errors };
    
    if (fieldName === 'username') {
      if (!value.trim()) {
        newErrors.username = 'El usuario es requerido';
      } else if (value.length < 2) {
        newErrors.username = 'El usuario debe tener al menos 2 caracteres';
      } else if (value.length > 50) {
        newErrors.username = 'El usuario no puede tener más de 50 caracteres';
      } else if (!/^[a-zA-Z0-9_.-]+$/.test(value)) {
        newErrors.username = 'El usuario solo puede contener letras, números, guiones, puntos y guiones bajos';
      } else if (value.startsWith(' ') || value.endsWith(' ')) {
        newErrors.username = 'El usuario no puede empezar o terminar con espacios';
      } else {
        delete newErrors.username;
      }
    } else if (fieldName === 'password') {
      if (!value.trim()) {
        newErrors.password = 'La contraseña es requerida';
      } else if (value.length < 3) {
        newErrors.password = 'La contraseña debe tener al menos 3 caracteres';
      } else if (value.length > 128) {
        newErrors.password = 'La contraseña no puede tener más de 128 caracteres';
      } else if (value.includes(' ')) {
        newErrors.password = 'La contraseña no puede contener espacios';
      } else if (!/^(?=.*[a-zA-Z])/.test(value)) {
        newErrors.password = 'La contraseña debe contener al menos una letra';
      } else {
        delete newErrors.password;
      }
    }
    
    setErrors(newErrors);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (touched.username) {
      validateField('username', value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      validateField('password', value);
    }
  };

  const handleBlur = (fieldName: 'username' | 'password') => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const value = fieldName === 'username' ? username : password;
    validateField(fieldName, value);
  };

  const isFormValid = () => {
    return username.length >= 2 && 
           username.length <= 50 && 
           /^[a-zA-Z0-9_.-]+$/.test(username) &&
           password.length >= 3 && 
           password.length <= 128 && 
           !password.includes(' ') &&
           /^(?=.*[a-zA-Z])/.test(password) &&
           Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simular un pequeño delay para mostrar el loading
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validar credenciales
    if (username === 'admin' && password === 'admin') {
      // Usar el hook de autenticación para hacer login
      login(username);
      
      // Redirigir al home
      router.push('/');
    } else {
      setErrors({ general: 'Usuario o contraseña incorrectos' });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tus credenciales para acceder
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                minLength={2}
                maxLength={50}
                pattern="[a-zA-Z0-9_.-]+"
                title="Solo se permiten letras, números, guiones, puntos y guiones bajos"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors`}
                placeholder="Usuario (2-50 caracteres)"
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => handleBlur('username')}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.username}
                </p>
              )}
              {!errors.username && username && touched.username && (
                <p className="mt-1 text-sm text-green-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Usuario válido
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={3}
                maxLength={128}
                title="La contraseña debe tener entre 3 y 128 caracteres, sin espacios y al menos una letra"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors`}
                placeholder="Contraseña (3-128 caracteres)"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
              {!errors.password && password && touched.password && (
                <p className="mt-1 text-sm text-green-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Contraseña válida
                </p>
              )}
            </div>
          </div>

          {errors.general && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error de autenticación
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{errors.general}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-200 ${
                isLoading || !isFormValid()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
