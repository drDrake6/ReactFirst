import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';

const Navbar = () => {
    const {setIsAuth} = useContext(AuthContext);

    const logOut = () => {
        setIsAuth(false)
        localStorage.setItem('auth', 'false');
    }

    return (
        <div className="navbar">
            <MyButton onClick={logOut}>Log out</MyButton>
            <div className="navbar__links">
              <Link className="navbar__link" to="/about">About</Link>
              <Link className="navbar__link" to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;