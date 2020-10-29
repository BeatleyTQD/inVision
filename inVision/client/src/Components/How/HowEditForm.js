import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { HowContext } from '../../Providers/HowProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function HowEditForm() {
    const { getSingleHow, updateHow } = useContext(HowContext);
    const [how, setHow] = useState({ description: "", timeToComplete: 0, isRepeatable: 0 });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getSingleHow(id)
            .then(setHow);
    }, []);

    const handleFieldChange = evt => {
        const stateToChange = { ...how };
        stateToChange[evt.target.id] = evt.target.value;
        setHow(stateToChange);

    };

    const handleIntFieldChange = evt => {
        const stateToChange = { ...how };
        stateToChange[evt.target.id] = parseInt(evt.target.value);
        setHow(stateToChange);
    };

    const Update = () => {
        const editedHow = {
            id: parseInt(id),
            description: how.description,
            timeToComplete: how.timeToComplete,
            isRepeatable: how.isRepeatable
        };
        updateHow(editedHow)
            .then(() => history.push(`/dreams/${how.dreamId}`));
    };

    const Cancel = () => {
        history.push(`/dreams/${how.dreamId}`);
    };

    return (
        <>
            <h2>update how</h2>
            <Form>
                <fieldset>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input id="description" type="text" value={how.description} onChange={handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="timeToComplete">How Long Will It Take?</Label>
                        <Input id="timeToComplete" type="number" value={how.timeToComplete} onChange={handleIntFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="isRepeatable">How Many Times Will You Do It?</Label>
                        <Input type="select" name="select" id="isRepeatable" value={how.isRepeatable} onChange={handleIntFieldChange}>
                            <option value={0}>Once</option>
                            <option value={1}>Many</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={Update}>Save How</Button>
                        <Button onClick={Cancel}>Cancel</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </>
    )
}