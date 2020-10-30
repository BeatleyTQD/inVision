import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { DreamContext } from '../../Providers/DreamProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
        <>
            <h2>new how</h2>
            <Form>
                <fieldset>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input id="name" type="text" onChange={handleFieldChange} />
                    </FormGroup>

                    <FormGroup>
                        <Button onClick={saveDream}>Save</Button>
                        <Button onClick={Cancel}>Cancel</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </>
    )
}