import { auth } from '../firebase/config.js';
import { useState } from 'react';
import { createUserWithEmailAndPassword,  
    signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from "firebase/auth"



// link da documentacao para usar https://firebase.google.com/docs/auth/web/facebook-login?hl=pt-br&_gl=1*1nmiusq*_up*MQ..&gclid=CjwKCAjwkvbEBhApEiwAKUz6-6gzbGc9wumJJIVyr04itGm23eU5bvAN-vfekeMe6IXvuclMl6RQaBoCJC0QAvD_BwE&gclsrc=aw.ds&gbraid=0AAAAADpUDOhsIlz1nTOv2ngrKswBJWXUS

function LoginPage() {
    const [loginType, setLoginType] = useState('login');
    const [userCredentials, setUserCredentials] = useState({})
    const [error, setError] = useState('')

    console.log(auth)

    function handleCredenciais(e){
        setUserCredentials({...userCredentials,[e.target.name]:e.target.value})
        
    }

    function handleCriarConta(e) {
        e.preventDefault()
        setError('');

        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage)
            setError(errorMessage)
            // ..
        });
    }

    function handleLogin (e) {

        e.preventDefault()
        setError('');

        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage)
            setError(errorMessage)
            // ..
        });
  };

  const handleGoogleLogin = async(e) =>{
    e.preventDefault()
    setError('');
try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)

    const user = result.user
    console.log ('Google login ok', user)
window.alert (`login efetuado no email: ${user.email}`);
} catch (error) {
    const errorMessage = error.message;
    console.error('Google login failed', error);
    setError(errorMessage)
}

  }

  function handlePasswordReset(){ 
    const email = prompt('Informe seu e-mail:') 
    sendPasswordResetEmail(auth, email) }
    

    

    return (
        <>
            <div className="container login-page">
                <section>
                    <h1>Etec Albert Einstein</h1>
                    <p>Entre ou crie uma conta para continuar.</p>
                    <div className="login-type">
                        <button  
                            className={`btn ${loginType === 'login' ? 'selected' : ''}`}
                             onClick={() => setLoginType('login')}
                            >
                            Entrar
                        </button>
                        <button 
                            className={`btn ${loginType === 'signup' ? 'selected' : ''}`}
                            onClick={() => setLoginType('signup')}>
                            Criar Conta
                        </button>
                    </div>
                    <form className="add-form login">
                        <div className="form-control">
                            <label>E-mail *</label>
                            <input onChange={(e) =>{handleCredenciais(e)}} type="text" name="email" placeholder="Informe seu email" />
                        </div>
                        <div className="form-control">
                            <label>Senha *</label>
                            <input onChange={(e) =>{handleCredenciais(e)}} type="password" name="password" placeholder="Informe a senha" />
                        </div>
                        {
                            loginType === 'login' ?
                            <button onClick={(e)=>{handleLogin(e)}} className="active btn btn-block">Entrar</button>
                            : 
                            <button onClick={(e)=>{handleCriarConta(e)}} className="active btn btn-block">Criar Conta</button>
                        }
                        <button onClick={(e) => {handleGoogleLogin(e)}} className="active btn btn-block">Login com Google</button>
                        
                           {<div className='error'>{error}</div>} 

                        <p onClick={handlePasswordReset} className="forgot-password">Esqueci minha senha.</p>
                    </form>
                </section>
            </div>
        </>
    );
};

export default LoginPage;