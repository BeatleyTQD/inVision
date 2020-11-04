import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { GiAllSeeingEye } from "react-icons/gi"
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProvider";
import { RiLoginBoxLine } from "react-icons/ri"

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { userName, email };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <Container>
            <h1>inVision <br /><GiAllSeeingEye /></h1>
            <br />
            <Form onSubmit={registerClick}>
                <fieldset>
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input id="userName" type="text" onChange={e => setUserName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" size="lg" block>Register<br /> <RiLoginBoxLine /></Button>
                    </FormGroup>
                    <em>
                        Already have an account? <Link to="login">Login</Link>
                    </em>
                </fieldset>
            </Form>
        </Container>
    );
}