import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import DreamList from './Dream/DreamList';
import DreamDetails from './Dream/DreamDetails';

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                {/*HOME NAVIGATION*/}
                <Route path="/" exact>
                    {isLoggedIn ? <DreamList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                {/*DREAM NAVIGATION*/}
                <Route path="/dreams" exact>
                    {isLoggedIn ? <DreamList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/dreams/:id" exact>
                    {isLoggedIn ? <DreamDetails /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};