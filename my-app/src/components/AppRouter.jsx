import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import { privateRoutes, publicRoutes } from '../routes';
import Login from '../pages/Login';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading){
        return <Loader/>
    }

    return (
        <Routes>
            {isAuth ? privateRoutes.map((route) =>
                <Route 
                    key={route.path}
                    path={route.path} 
                    element={route.component} 
                    exact={route.exact}
                />
            ) :
            publicRoutes.map((route) =>
                <Route 
                    key={route.path}
                    path={route.path} 
                    element={route.component} 
                    exact={route.exact}
                />
            )}
            {isAuth
             ? <Route path="*" element={<Error />}/>
             : <Route path="*" element={<Login />}/>
            }
        </Routes>
    );
};

export default AppRouter;