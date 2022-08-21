import { useState, useRef} from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const fetchEmailRef = useRef();
  const fetchpasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = fetchEmailRef.current.value;
    const enteredPassword = fetchpasswordRef.current.value;
    setLoading(true)

    if(isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTDKhub2HFtP43AtHuJENxi-RF0CS8Yds', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
      }),
      headers:{ 
        'Content-Type': 'application/json'
     }
      })
      .then( res => {
        setLoading(false)
        if(res.ok) {
          res.json().then(data => localStorage.setItem('tokonId',data.localId))

        } else {
          return res.json().then(data => {
            alert(data.error.message);
          });
        }
      }
      )

    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTDKhub2HFtP43AtHuJENxi-RF0CS8Yds', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
      }),
      headers:{ 
        'Content-Type': 'application/json'
     }
      })
      .then( res => {
        setLoading(false)
        if(res.ok) {

        } else {
          return res.json().then(data => {
            alert(data.error.message);
          });
        }
      }
      )
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={fetchEmailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={fetchpasswordRef}/>
        </div>
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button> }
          {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
