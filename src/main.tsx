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

const store = setupStore();

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={"/"} element={<App/>}>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
        <Route element={<NavBar/>}>
            <Route index path={"/documents"} element={<Documents/>}/>
            <Route path={"/"} element={<Navigate to={"/documents"}/>}/>
        </Route>
    </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
