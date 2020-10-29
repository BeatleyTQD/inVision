import React, { useContext, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import Why from '.././Why/Why';
import { WhyContext } from '../../Providers/WhyProvider';

export default function WhyList() {
    const { id } = useParams();
    const history = useHistory();
    const { whys, getDreamWhys } = useContext(WhyContext);

    useEffect(() => {
        const intId = parseInt(id)
        getDreamWhys(intId);
    }, [])

    const Add = () => {
        history.push(`/dreams/${id}/whys/add`)
    };

    const GoBack = () => {
        history.push(`/dreams/${id}`)
    }
    return (
        <>
            <h2>member now?</h2>
            <Button onClick={GoBack} color="info">i am done membering</Button>
            <br />
            <Button onClick={Add}>Add Why</Button>
            <div>
                {whys.map((why) => (
                    <Why key={why.id} why={why} />
                ))}
            </div>
        </>
    )
}