import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { WhyContext } from '../../Providers/WhyProvider';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export default function WhyEditForm() {
    const { getSingleWhy, updateWhy } = useContext(WhyContext);
    const [why, setWhy] = useState({ description: "" });
    const { id } = useParams();
    const history = useHistory();

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    useEffect(() => {
        getSingleWhy(id)
            .then(setWhy);
    }, []);

    const handleFieldChange = evt => {
        const stateToChange = { ...why };
        stateToChange[evt.target.id] = evt.target.value;
        setWhy(stateToChange);
    };

    const Update = () => {
        const editedWhy = {
            id: parseInt(id),
            description: why.description
        };
        updateWhy(editedWhy)
            .then(sleep(400))
            .then(() => history.push(`/dreams/${why.dreamId}/whys`));
    };

    const Cancel = () => {
        history.push(`/dreams/${why.dreamId}/whys`);
    };

    return (
        <Container>
            <h2>Edit</h2>
            <Form>
                <fieldset>
                    <FormGroup>
                        <Input id="description" type="text" value={why.description} onChange={handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={Update} color="success" size="lg" block>Save</Button>
                        <Button onClick={Cancel} size="lg" block>Cancel</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </Container>
    )
}