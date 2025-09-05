import { auth } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext'; // Importe o hook useAuth
import Header from '../components/Header';

function MainPage() {

  const pageTitle = "Página inicial";

  const { user } = useAuth(); // Acesse o objeto user do contexto

  const handleSignOut = () => {
    auth.signOut();
  };

  console.log(user);

  if (!user) {
    return <p>Carregando informações do usuário...</p>; // Ou redirecione para a página de login
  }

  return (
    <>
    <Header pageTitle={pageTitle}/>
    <div className='fundo'>
      <h1>Página Principal</h1> <br />
      {user.displayName && <p>Nome: {user.displayName}</p>} <br />
      {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" />} <br /> <br />
      <button onClick={handleSignOut}>Logout</button>
    </div>
    </>
  );
}

export default MainPage;
