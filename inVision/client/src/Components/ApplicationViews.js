import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import DreamList from './Dream/DreamList';
import DreamDetails from './Dream/DreamDetails';
import HowForm from './How/HowForm';
import WhyList from './Why/WhyList';

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

                {/*HOW NAVIGATION*/}
                <Route path="/dreams/:id/how/add">
                    {isLoggedIn ? <HowForm /> : <Redirect to="/login" />}
                </Route>

                {/*WHY NAVIGATION*/}
                <Route path="/dreams/:id/whys">
                    {isLoggedIn ? <WhyList /> : <Redirect to="/login" />}
                </Route>

            </Switch>
        </main>
    );
};