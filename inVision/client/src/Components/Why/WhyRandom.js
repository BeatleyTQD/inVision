import React, { useContext } from "react";
import Why from '.././Why/Why';
import { WhyContext } from '../../Providers/WhyProvider';

export default function WhyRandom() {
    const { whys } = useContext(WhyContext);
    let randomWhy = whys[Math.floor(Math.random() * whys.length)];

    return (
        <>
            <Why key={randomWhy.id} why={randomWhy} />
        </>
    )
}