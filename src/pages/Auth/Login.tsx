import { auth, googleProvider, githubProvider, twitterProvider, facebookProvider } from '../Auth/firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, type AuthProvider, type UserCredential } from 'firebase/auth';
import { useState, type JSX } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { HiMail, HiUser } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';


type UserData = {
  displayName: string | null;
  email: string | null;
};

export default function Login(): JSX.Element {
  const { setUser: setGlobalUser } = useAuth(); // Cambio clave aquí
  const [localUser, setLocalUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


   const handleLoginWithProvider = async (provider: AuthProvider) => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      
      if (!result.user.email) {
        throw new Error("No se pudo obtener el email. Por favor usa otro método.");
      }

      const userData = { 
        displayName: result.user.displayName || result.user.email.split('@')[0],
        email: result.user.email,
      };

      setLocalUser(userData);
      setGlobalUser(result.user); // Actualiza el contexto global

    } catch (err: any) {
      let errorMessage = "Error al autenticar";
      
      if (err.code) {
        switch (err.code) {
          case 'auth/account-exists-with-different-credential':
            errorMessage = "Este email ya está registrado con otro método";
            break;
          case 'auth/popup-closed-by-user':
            errorMessage = "Ventana de autenticación cerrada";
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = "Solicitud cancelada";
            break;
          case 'auth/unauthorized-domain':
            errorMessage = "Dominio no autorizado (configura firebase)";
            break;
          default:
            errorMessage = `Error: ${err.code}`;
        }
      } else {
        errorMessage = err.message || "Error desconocido";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!isLoginForm && formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
  
    try {
      setLoading(true);
      if (isLoginForm) {
        // Lógica para login con email/password
        // signInWithEmailAndPassword(auth, formData.email, formData.password)
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        // Actualización CORREGIDA:
        setLocalUser({
          displayName: formData.name || userCredential.user.email,
          email: userCredential.user.email
        });
        
        // Pasa el objeto User completo al contexto
        setGlobalUser(userCredential.user);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header con degradado */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">
              {isLoginForm ? 'Bienvenido' : 'Crea tu cuenta'}
            </h2>
            <p className="text-blue-100 mt-1">
              {isLoginForm ? 'Inicia sesión para continuar' : 'Únete a nuestra comunidad'}
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r">
                <p>{error}</p>
              </div>
            )}

            {localUser ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👋</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">¡Hola {localUser.displayName}!</h3>
                <p className="text-gray-600 mt-2">Has iniciado sesión como {localUser.email}</p>
              </div>
            ) : (
              <>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {!isLoginForm && (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Nombre completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLockPasswordFill className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="password"
                      type="password"
                      required
                      minLength={6}
                      placeholder="Contraseña"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {!isLoginForm && (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RiLockPasswordFill className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="confirmPassword"
                        type="password"
                        required
                        minLength={6}
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </span>
                    ) : isLoginForm ? 'Iniciar sesión' : 'Registrarse'}
                  </button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        O continúa con
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-3">
                    <button
                      onClick={() => handleLoginWithProvider(googleProvider)}
                      className="p-2 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <FcGoogle className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => handleLoginWithProvider(githubProvider)}
                      className="p-2 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <FaGithub className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={() => handleLoginWithProvider(twitterProvider)}
                      className="p-2 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <FaTwitter className="h-6 w-6 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleLoginWithProvider(facebookProvider)}
                      className="p-2 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <FaFacebook className="h-6 w-6 text-blue-600" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsLoginForm(!isLoginForm)}
                    className="text-blue-600 hover:text-blue-500 font-medium text-sm"
                  >
                    {isLoginForm 
                      ? '¿No tienes cuenta? Regístrate aquí' 
                      : '¿Ya tienes cuenta? Inicia sesión'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}