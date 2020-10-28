import React from 'react';

export default function CompletedHow({ completedHow }) {
    return (
        <>
            <div>
                {completedHow.how.description} <br />
                done on {new Intl.DateTimeFormat('en-US').format(new Date(completedHow.dateCompleted))}
            </div>
        </>
    )
}