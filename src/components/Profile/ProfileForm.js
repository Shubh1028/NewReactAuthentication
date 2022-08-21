import React, {useRef, useContext} from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext)
  const updatePasswordRef = useRef();
  const confirmPasswordHandler = (e) => {
    e.preventDefault();
    const updatedPassword = updatePasswordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBTDKhub2HFtP43AtHuJENxi-RF0CS8Yds', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: updatedPassword,
        returnSecureToken: true
    }),
    headers:{ 
      'Content-Type': 'application/json'
   }
    })
    .then( res => {
      if(res.ok) {
        

      } else {
        return res.json().then(data => {
          alert(data.error.message);
        });
      }
    }
    )

  } 
  return (
    <form className={classes.form} onSubmit={confirmPasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={updatePasswordRef}/>
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
