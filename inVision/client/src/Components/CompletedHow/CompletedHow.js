import React from 'react';

export default function CompletedHow({ completedHow }) {
    return (
        <>
            <div>
                <b>
                    {completedHow.how.description}{" "}
                </b>
                <em>
                    completed {new Intl.DateTimeFormat('en-US').format(new Date(completedHow.dateCompleted))}
                </em>
            </div>
        </>
    )
}