import React, { useEffect, useContext, useState } from "react";
import { DreamContext } from '../../Providers/DreamProvider';
import { HowContext } from '../../Providers/HowProvider';
import { CompletedHowContext } from '../../Providers/CompletedHowProvider';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button } from "reactstrap";
import How from '.././How/How';
import CompletedHow from '.././CompletedHow/CompletedHow';

export default function DreamDetails() {
    const [dream, setDream] = useState();
    const history = useHistory();
    const { getDream } = useContext(DreamContext);
    const { hows, getActiveHows } = useContext(HowContext);
    const { completedHows, getCompletedHows } = useContext(CompletedHowContext);
    const { id } = useParams();


    const loadDream = (id) => {
        getDream(id)
            .then(setDream);
        getActiveHows(id);
        getCompletedHows(id);
    }

    useEffect(() => {
        loadDream(id);
    }, [])

    const Add = () => {
        history.push(`${id}/how/add`)
    }

    const Whys = () => {
        history.push(`${id}/whys`)
    }

    if (!dream) {
        return null;
    }

    return (
        <>
            <h1>{dream.name}</h1>
            <Button color="primary" onClick={Add}>CREATE NEW HOW</Button>{" "}
            <br />
            <Button color="link" >gimme a random how</Button>
            <h3>Active Hows</h3>
            <div>
                {hows.map((how) => (
                    <How key={how.id} how={how} />
                ))}
            </div>
            <h3>Completed Hows</h3>
            <div>
                {completedHows.map((completedHow) => (
                    <CompletedHow key={completedHow.id} completedHow={completedHow} />
                ))}
            </div>
            <h4>random why will go here</h4>
            <Button color="link" onClick={Whys}>remind me why</Button>
        </>
    )
}