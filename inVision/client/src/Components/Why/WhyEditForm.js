import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { WhyContext } from '../../Providers/WhyProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function WhyForm() {
    const { getSingleWhy, updateWhy } = useContext(WhyContext);
    const [why, setWhy] = useState({ description: "" });
    const { id } = useParams();
    const history = useHistory();

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
            .then(() => history.push(`/dreams/${why.dreamId}/whys`));
    };

    const Cancel = () => {
        history.push(`/dreams/${why.dreamId}/whys`);
    };

    return (
        <>
            <h2>new why</h2>
            <Form>
                <fieldset>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input id="description" type="text" value={why.description} onChange={handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={Update}>Save</Button>
                        <Button onClick={Cancel}>Cancel</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </>
    )
}