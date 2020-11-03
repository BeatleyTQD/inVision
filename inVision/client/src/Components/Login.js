import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProvider";
import { BsTriangleHalf } from "react-icons/bs"
import { RiLoginBoxLine } from "react-icons/ri"

export default function Login() {
    const history = useHistory();
    const { login } = useContext(UserProfileContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Container>
            <h1>inVision <br /><BsTriangleHalf /></h1>
            <br />
            <Form onSubmit={loginSubmit}>
                <fieldset>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" size="lg" block>Login <br /><RiLoginBoxLine /></Button>
                    </FormGroup>
                    <em>
                        Not registered? <Link to="register">Register</Link>
                    </em>
                </fieldset>
            </Form>
        </Container>
    );
}