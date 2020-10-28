import React from 'react';
import { Button } from 'reactstrap';

export default function How({ how }) {
    return (
        <>
            <div>
                <Button color="link" >{how.description}</Button>
                <br />
                {how.timeToComplete} Minutes
            </div>
        </>
    )
}