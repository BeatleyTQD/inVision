import React from "react";
import { Button } from 'reactstrap';
import { useHistory } from "react-router-dom";

export default function Why({ why }) {
    const history = useHistory();

    const Edit = () => {
        history.push(`/why/edit/${why.id}`)
    }

    return (
        <>
            <div>
                {why.description}
                <Button color="link" onClick={Edit}>Edit</Button>
                <Button color="link">Delete</Button>
            </div>
            <br />
        </>
    )
}