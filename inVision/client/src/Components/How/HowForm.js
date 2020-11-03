import React, { useContext, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { HowContext } from '../../Providers/HowProvider';
import { Button, Form, FormGroup, Label, Input, InputGroupAddon, InputGroupText, InputGroup, Container } from 'reactstrap';
import { HiPlus, HiOutlineCheck } from "react-icons/hi";


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
        how.dreamId = parseInt(id);
        addHow(how)
            .then(history.push(`/dreams/${id}`));
    };

    return (
        <Container>
            <h2>How?</h2>
            <Form>
                <fieldset>
                    <FormGroup>
                        <Input id="description" type="text" onChange={handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="timeToComplete">How Long Will It Take?</Label>
                        <InputGroup>
                            <Input id="timeToComplete" type="number" onChange={handleIntFieldChange} />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>minutes</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="isRepeatable">How Many Times Will You Do It?</Label>
                        <Input type="select" name="select" id="isRepeatable" onChange={handleIntFieldChange}>
                            <option value={0}>Once</option>
                            <option value={1}>Many</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={saveHow} color="success" size="lg" block>Save and Add More <br /><HiPlus /></Button>{" "}
                        <Button onClick={done} size="lg" block>Save and Finish <br /> <HiOutlineCheck /></Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </Container>
    )
}