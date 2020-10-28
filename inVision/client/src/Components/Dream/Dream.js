import React, { useContext } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { DreamContext } from '../../Providers/DreamProvider';


export default function Dream({ dream }) {
    const history = useHistory();

    const Details = () => {
        history.push(`dreams/${dream.id}`)
    }
    return (
        <>
            <Button color="link" onClick={Details}>{dream.name}</Button>
        </>
    )
}