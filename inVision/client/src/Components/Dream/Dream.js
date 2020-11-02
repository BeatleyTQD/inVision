import React from "react";
import { Button, Card } from "reactstrap";
import { useHistory } from "react-router-dom";
import { ImCloud } from "react-icons/im";


export default function Dream({ dream }) {
    const history = useHistory();

    const Details = () => {
        history.push(`dreams/${dream.id}/reminder`)
    }
    return (
        <>
            <Button outline color="info" onClick={Details} size="lg" block>{dream.name} <br /> <ImCloud /></Button>
            <br />
        </>
    )
}