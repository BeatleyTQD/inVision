import React, { useEffect, useContext, useState } from "react";
import { DreamContext } from '../../Providers/DreamProvider';
import { HowContext } from '../../Providers/HowProvider';
import { CompletedHowContext } from '../../Providers/CompletedHowProvider';
import { WhyContext } from '../../Providers/WhyProvider';
import { useHistory, useParams, Link } from 'react-router-dom';

export default function DreamDetails() {
    const [dream, setDream] = useState();
    const [hows, setHows] = useState([]);
    const [completedHows, setCompletedHows] = useState([]);
    const [whys, setWhys] = useState([]);
    const { getDream } = useContext(DreamContext);
    const { id } = useParams();

    useEffect(() => {
        getDream(id)
            .then(setDream);
    }, [])

}