import React, { useContext, useEffect } from "react";
import Dream from '../Dream/Dream';
import { UserProfileContext } from '../../Providers/UserProfileProvider';
import { DreamContext } from '../../Providers/DreamProvider';
import { useHistory } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import { HiOutlineMoon } from 'react-icons/hi'

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
                <h2>My Wildest Dreams</h2>
                <br />
                <Row>
                    <Col sm="6">
                        {dreams.map((dream) => (
                            <Dream key={dream.id} dream={dream} />
                        ))}
                    </Col>
                </Row>
                <Button color="success" onClick={New} size="lg" block>New Dream <br /><HiOutlineMoon /></Button>
                <br />
                <Button color="warning" onClick={logout} size="lg" block>Logout</Button>
            </Container>
        </>
    )
}