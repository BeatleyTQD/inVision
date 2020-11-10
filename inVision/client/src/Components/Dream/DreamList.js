import React, { useContext, useEffect } from 'react';
import Dream from '../Dream/Dream';
import { UserProfileContext } from '../../Providers/UserProfileProvider';
import { DreamContext } from '../../Providers/DreamProvider';
import { useHistory } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import { HiOutlineMoon } from 'react-icons/hi';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { GiAllSeeingEye } from 'react-icons/gi';
import { AiFillStop } from 'react-icons/ai';

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

  const Inactive = () => {
    history.push(`/InactiveDreams`);
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
        <Button color="danger" onClick={Inactive} size="lg" block>
          Inactive Dreams <br />
          <AiFillStop />
        </Button>
        <Button color="secondary" onClick={logout} size="lg" block>
          Logout <br />
          <RiLogoutBoxLine />
        </Button>
      </Container>
    </>
  );
}
