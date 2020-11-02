import React, { useContext, useEffect } from "react";
import Dream from '../Dream/Dream';
import { UserProfileContext } from '../../Providers/UserProfileProvider';
import { DreamContext } from '../../Providers/DreamProvider';
import { useHistory } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';

export default function DreamList() {
    const { logout } = useContext(UserProfileContext);
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
            <Container>
                <h2>your wildest dreams</h2>
                <br />
                <Button color="success" onClick={New} size="lg" block>Add Dream</Button>
                <br />
                <Row>
                    <Col sm="6">
                        {dreams.map((dream) => (
                            <Dream key={dream.id} dream={dream} />
                        ))}
                    </Col>
                </Row>
                <Button color="warning" onClick={logout} size="lg" block>Logout</Button>
            </Container>
        </>
    )
}