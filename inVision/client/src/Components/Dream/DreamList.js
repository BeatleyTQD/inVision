import React, { useContext, useEffect } from "react";
import Dream from '../Dream/Dream';
import { DreamContext } from '../../Providers/DreamProvider';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function DreamList() {
    const { dreams, getUserDreams } = useContext(DreamContext);
    const history = useHistory();

    useEffect(() => {
        getUserDreams();
    }, [])

    const New = () => {
        history.push(`/addDream`)
    }


    return (
        <>
            <h2>your wildest dreams</h2>
            <Button color="link" onClick={New}>new dream</Button>
            <div>
                {dreams.map((dream) => (
                    <Dream key={dream.id} dream={dream} />
                ))}
            </div>
        </>
    )
}