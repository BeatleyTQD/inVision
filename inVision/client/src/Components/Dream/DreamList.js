import React, { useContext, useEffect } from 'react';
import Dream from '../Dream/Dream';
import { UserProfileContext } from '../../Providers/UserProfileProvider';
import { DreamContext } from '../../Providers/DreamProvider';
import { useHistory } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import { HiOutlineMoon } from 'react-icons/hi';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { GiAllSeeingEye } from 'react-icons/gi';

export default function DreamList() {
  const { logout } = useContext(UserProfileContext);
  const { dreams, getUserDreams } = useContext(DreamContext);
  const history = useHistory();

  useEffect(() => {
    getUserDreams();
  }, []);

  const New = () => {
    history.push(`/addDream`);
  };

  return (
    <>
      <Container>
        <h1>
          inVision <br />
          <GiAllSeeingEye />
        </h1>
        <br />
        <Row>
          <Col>
            {dreams.map((dream) => (
              <Dream key={dream.id} dream={dream} />
            ))}
          </Col>
        </Row>
        <Button color="success" onClick={New} size="lg" block>
          New Dream <br />
          <HiOutlineMoon />
        </Button>
        <br />
        <Button color="secondary" onClick={logout} size="lg" block>
          Logout <br />
          <RiLogoutBoxLine />{' '}
        </Button>
        <br />
      </Container>
    </>
  );
}
