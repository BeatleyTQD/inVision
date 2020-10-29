import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";


export default function Dream({ dream }) {
    const history = useHistory();

    const Details = () => {
        history.push(`dreams/${dream.id}/reminder`)
    }
    return (
        <>
            <Button color="link" onClick={Details}>{dream.name}</Button>
            <br />
        </>
    )
}