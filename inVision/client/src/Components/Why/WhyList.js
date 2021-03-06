import React, { useContext, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import Why from '.././Why/Why';
import { WhyContext } from '../../Providers/WhyProvider';
import { HiPlus, HiArrowLeft } from "react-icons/hi";


export default function WhyList() {
    const { id } = useParams();
    const history = useHistory();
    const { whys, getDreamWhys } = useContext(WhyContext);

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    useEffect(() => {
        const intId = parseInt(id)
        getDreamWhys(intId)
    }, [])

    const Add = () => {
        history.push(`/dreams/${id}/whys/add`)
    };

    const GoBack = () => {
        history.push(`/dreams/${id}`)
    }
    return (
        <Container>
            <h2>Why?</h2>
            <br />
            <div>
                {whys.map((why) => (
                    <Why key={why.id} why={why} />
                ))}
            </div>
            <Button onClick={Add} color="warning" size="lg" block>Add Why <br /><HiPlus /></Button>
            <Button onClick={GoBack} size="lg" block>Back to Dream <br /> <HiArrowLeft /></Button>
        </Container>
    )
}