import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { DreamContext } from '../../Providers/DreamProvider';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export default function DreamForm() {
    const { addDream } = useContext(DreamContext);
    const [dream, setDream] = useState({ name: "", isDeactivated: 0, userProfileId: 0 })
    const history = useHistory();
    const userProfile = sessionStorage.getItem("userProfile");
    const activeUser = JSON.parse(userProfile);

    const handleFieldChange = evt => {
        const stateToChange = { ...dream };
        stateToChange[evt.target.id] = evt.target.value;
        setDream(stateToChange);
    };

    const saveDream = () => {
        dream.userProfileId = activeUser.id
        addDream(dream)
            .then((res) => {
                history.push(`/dreams/${res.id}/whys/add`)
            })

    }

    const Cancel = () => {
        history.push(`/`);
    };

    return (
        <Container>
            <h2>What greatness do you aspire to?</h2>
            <br />
            <Form>
                <fieldset>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input id="name" type="text" onChange={handleFieldChange} />
                    </FormGroup>

                    <FormGroup>
                        <Button onClick={saveDream} color="success" size="lg" block>Save and Continue</Button>{' '}
                        <Button onClick={Cancel} size="lg" block>Cancel</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </Container>
    )
}