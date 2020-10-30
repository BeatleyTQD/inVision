import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import DreamList from './Dream/DreamList';
import DreamReminder from './Dream/DreamReminder';
import DreamDetails from './Dream/DreamDetails';
import DreamForm from './Dream/DreamForm';
import HowForm from './How/HowForm';
import HowEditForm from './How/HowEditForm';
import WhyList from './Why/WhyList';
import WhyForm from './Why/WhyForm';
import WhyEditForm from './Why/WhyEditForm';

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

                <Route path="/dreams/:id" exact>
                    {isLoggedIn ? <DreamDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/dreams/:id/reminder" exact>
                    {isLoggedIn ? <DreamReminder /> : <Redirect to="/login" />}
                </Route>

                <Route path="/addDream" exact>
                    {isLoggedIn ? <DreamForm /> : <Redirect to="/login" />}
                </Route>

                {/*HOW NAVIGATION*/}
                <Route path="/dreams/:id/how/add">
                    {isLoggedIn ? <HowForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/how/edit/:id">
                    {isLoggedIn ? <HowEditForm /> : <Redirect to="/login" />}
                </Route>

                {/*WHY NAVIGATION*/}
                <Route path="/dreams/:id/whys" exact>
                    {isLoggedIn ? <WhyList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/dreams/:id/whys/add">
                    {isLoggedIn ? <WhyForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/why/edit/:id">
                    {isLoggedIn ? <WhyEditForm /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};