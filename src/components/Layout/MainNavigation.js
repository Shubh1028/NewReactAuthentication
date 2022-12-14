import { Link,useHistory } from 'react-router-dom';
import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const onLogoutHandler = () => {
    authCtx.logout()
    history.replace('/auth')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
          {!authCtx.isLoggedIn && <Link to='/auth'>Login</Link> }
          </li>
          <li>
          {authCtx.isLoggedIn && <Link to='/profile'>Profile</Link> }
          </li>
          <li>
          {authCtx.isLoggedIn &&  <button onClick={onLogoutHandler}>Logout</button> }
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
