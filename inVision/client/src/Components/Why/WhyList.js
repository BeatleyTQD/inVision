import React, { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Why from '.././Why/Why';
import { WhyContext } from '../../Providers/WhyProvider';

export default function WhyList() {
    const { id } = useParams();
    const { whys, getDreamWhys } = useContext(WhyContext);

    useEffect(() => {
        const intId = parseInt(id)
        getDreamWhys(intId);
    }, [])

    return (
        <>
            <h2>member now?</h2>
            <div>
                {whys.map((why) => (
                    <Why key={why.id} why={why} />
                ))}
            </div>
        </>
    )
}