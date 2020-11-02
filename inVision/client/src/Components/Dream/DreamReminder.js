import React, { useEffect, useContext, useState } from "react";
import { Button, Container } from "reactstrap";
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
        <Container>
            <h1>
                I set out to <br />
                <em>{why.dream.name}</em>
                <br />because I want to...
            </h1>
            <br />

            <h3>{why.description}</h3>
            <br />
            <Button color="success" onClick={Details} size="lg" block>Ah, yes.</Button>
        </Container>
    )
}