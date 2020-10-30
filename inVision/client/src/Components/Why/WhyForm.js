import React, { useContext, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { WhyContext } from '../../Providers/WhyProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
        history.push(`/dreams/${id}/whys`)
    }

    return (
        <>
            <h2>new why</h2>
            <Form>
                <fieldset>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input id="description" type="text" onChange={handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={saveWhy}>Add More</Button>
                        <Button onClick={done}>Done</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </>
    )
}