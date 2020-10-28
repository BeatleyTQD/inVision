import React, { useContext, useEffect } from "react";
import Dream from '../Dream/Dream';
import { DreamContext } from '../../Providers/DreamProvider';
import { useHistory } from 'react-router-dom';

export default function DreamList() {
    const { dreams, getUserDreams } = useContext(DreamContext);

    useEffect(() => {
        getUserDreams();
    }, [])

    return (
        <>
            <h2>your wildest dreams</h2>
            <div>
                {dreams.map((dream) => (
                    <Dream key={dream.id} dream={dream} />
                ))}
            </div>
        </>
    )
}