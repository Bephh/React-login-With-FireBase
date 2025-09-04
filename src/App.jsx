import './App.css';
import { AuthProvider } from './contexts/AuthContext'; // Importe o AuthProvider
import { useAuth } from './contexts/AuthContext'; // Importe o hook useAuth
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import UserProfileForm from './views/UserProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // Envolva tudo com BrowserRouter para permitir o roteamento
    <Router>
      <AuthProvider>
        <AuthContent />
      </AuthProvider>
    </Router>
  );
}

function AuthContent() {
  const { user } = useAuth(); // Acesso ao estado do usuário no contexto
  return (
    <>
      {/* Renderiza as rotas dependendo se o usuário está autenticado */}
      {user ? (
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/user-prof" element={<UserProfileForm />} />
        </Routes>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
