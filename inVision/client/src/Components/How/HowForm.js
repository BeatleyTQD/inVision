import React, { useContext, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { HowContext } from '../../Providers/HowProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default function HowForm() {
    const { addHow } = useContext(HowContext);
    const [how, setHow] = useState({ description: "", timeToComplete: 0, isRepeatable: 0, dreamId: 0 })
    const { id } = useParams();
    const history = useHistory();

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

    const saveHow = () => {
        how.dreamId = parseInt(id);
        addHow(how)
            .then(document.getElementById("description").value = "",
                document.getElementById("timeToComplete").value = "",
                document.getElementById("isRepeatable").value = 0)
    }

    const done = () => {
        history.push(`/dreams/${id}`);
    };

    return (
        <>
            <h2>new how</h2>
            <Form>
                <fieldset>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input id="description" type="text" onChange={handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="timeToComplete">How Long Will It Take?</Label>
                        <Input id="timeToComplete" type="number" placeholder="in minutes" onChange={handleIntFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="isRepeatable">How Many Times Will You Do It?</Label>
                        <Input type="select" name="select" id="isRepeatable" onChange={handleIntFieldChange}>
                            <option value={0}>Once</option>
                            <option value={1}>Many</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={saveHow} color="info">Add More</Button>
                        <Button onClick={done}>Done</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </>
    )
}