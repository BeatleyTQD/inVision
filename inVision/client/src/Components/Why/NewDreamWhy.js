
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { WhyContext } from '../../Providers/WhyProvider';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { HiPlus, HiOutlineCheck } from "react-icons/hi";


export default function NewDreamWhy() {
    const { addWhy } = useContext(WhyContext);
    const [why, setWhy] = useState({ description: "" });
    const { id } = useParams();
    const history = useHistory();

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

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
            .then(sleep(400))
            .then(history.push(`/newDream/${id}/hows`))
    }

    return (
        <Container>
            <h2>Why Do I Want To Do This?</h2>
            <br />
            <Form>
                <fieldset>
                    <FormGroup>
                        <Input id="description" type="text" onChange={handleFieldChange} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Button onClick={saveWhy} color="success" size="lg" block>Save and Add More <br /><HiPlus /></Button>
                        <Button onClick={done} size="lg" block>Save and Continue to How<br /> <HiOutlineCheck /></Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </Container>
    )
}