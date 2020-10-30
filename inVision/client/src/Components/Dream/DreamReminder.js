import React, { useEffect, useContext, useState } from "react";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';
import { WhyContext } from '../../Providers/WhyProvider';

export default function DreamReminder() {
    const [why, setWhy] = useState();
    const { getRandomWhy } = useContext(WhyContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getRandomWhy(id)
            .then(setWhy);
    }, [])

    const Details = () => {
        history.push(`/dreams/${id}`)
    }

    if (!why) {
        return null;
    }

    return (
        <>
            <h1>I set out to do this because...</h1>
            <h4>{why.description}</h4>
            <Button color="link" onClick={Details}>i have properly reflected</Button>
        </>
    )
}