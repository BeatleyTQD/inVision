import React, { useContext, useEffect } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import InactiveDream from '../InactiveDream/InactiveDream';
import { DreamContext } from '../../../Providers/DreamProvider';
import { HiArrowLeft } from 'react-icons/hi';
import { useHistory, useParams } from 'react-router-dom';

export default function InactiveDreamList() {
  const { inactiveDreams, getInactiveDreams } = useContext(DreamContext);
  const history = useHistory();

  useEffect(() => {
    getInactiveDreams();
  }, []);

  const allDreams = () => {
    history.push(`/`);
  };

  return (
    <>
      <Container>
        <h1>
          Inactive Dreams <br />
        </h1>
        <br />
        <Row>
          <Col>
            {inactiveDreams.map((inactiveDream) => (
              <InactiveDream
                key={inactiveDream.id}
                inactiveDream={inactiveDream}
              />
            ))}
          </Col>
        </Row>
        <br />
        <Button color="secondary" onClick={allDreams} size="lg" block>
          Dream List <br /> <HiArrowLeft />{' '}
        </Button>
      </Container>
    </>
  );
}
