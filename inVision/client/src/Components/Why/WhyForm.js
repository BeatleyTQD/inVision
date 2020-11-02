import React, { useContext, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { WhyContext } from '../../Providers/WhyProvider';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export default function WhyForm() {
    const { addWhy } = useContext(WhyContext);
    const [why, setWhy] = useState({ description: "" });
    const { id } = useParams();
    const history = useHistory();

    const handleFieldChange = evt => {
        const stateToChange = { ...why };
        stateToChange[evt.target.id] = evt.target.value;
        setWhy(stateToChange);
    };

    const saveWhy = () => {
        why.dreamId = parseInt(id);
        addWhy(why)
            .then(document.getElementById("description").value = "");
    }

    const done = () => {
        why.dreamId = parseInt(id);
        addWhy(why)
            .then(history.push(`/dreams/${id}/whys`))
    }

    return (
        <Container>
            <h2>Why am I doing this?</h2>
            <Form>
                <fieldset>
                    <FormGroup>
                        <Input id="description" type="text" onChange={handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={saveWhy} color="success" size="lg" block>Save and Add More</Button>
                        <Button onClick={done} size="lg" block>Save and Finish</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </Container>
    )
}