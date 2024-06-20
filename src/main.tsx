import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {setupStore} from "./store/store.ts";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Login from "./components/Login.tsx";
import {Provider} from "react-redux";
import NavBar from "./components/NavBar.tsx";
import Documents from "./components/document/Documents.tsx";
import Register from "./components/Register.tsx";
import VerifyAccount from "./components/VerifyAccount.tsx";
import ResetPassword from "./components/ResetPassword.tsx";
import VerifyPassword from "./components/VerifyPassword.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import RestrictedRoute from "./components/RestrictedRoute.tsx";
import User from "./components/profile/User.tsx";
import Profile from "./components/profile/Profile.tsx";
import Password from "./components/profile/Password.tsx";
import Settings from "./components/profile/Settings.tsx";
import Authorization from "./components/profile/Authorization.tsx";
import Authentication from "./components/profile/Authentication.tsx";
import NotFound from "./components/NotFound.tsx";
import DocumentDetails from "./components/document/DocumentDetails.tsx";
import Users from "./components/users/Users.tsx";

const store = setupStore();

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={"/"} element={<App/>}>

        <Route path={"login"} element={<Login/>}/>
        <Route path={"register"} element={<Register/>}/>
        <Route path='resetpassword' element={<ResetPassword/>}/>
        <Route path='verify/password' element={<VerifyPassword/>}/>
        <Route path={"verify/account"} element={<VerifyAccount/>}/>

        <Route element={<ProtectedRoute/>}>
            <Route element={<NavBar/>}>
                <Route index path={"/documents"} element={<Documents/>}/>
                <Route path={"/"} element={<Navigate to={"/documents"}/>}/>
                <Route path='documents/:documentId' element={<DocumentDetails/>}/>
            </Route>
            <Route element={<RestrictedRoute/>}>
                <Route path={"users"} element={<Users/>}/>
            </Route>
            <Route path='/user' element={<User/>}>
                <Route path='/user' element={<Navigate to='/user/profile'/>}/>
                <Route path='profile' element={<Profile/>}/>
                <Route path='password' element={<Password/>}/>
                <Route path='settings' element={<Settings/>}/>
                <Route path='authorization' element={<Authorization/>}/>
                <Route path='authentication' element={<Authentication/>}/>
            </Route>
        </Route>

        <Route path='*' element={<NotFound/>}/>
    </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
