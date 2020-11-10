import React, { useEffect, useContext, useState } from 'react';
import { Button, Container } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { WhyContext } from '../../Providers/WhyProvider';
import { HiArrowRight } from 'react-icons/hi';
import { DreamContext } from '../../Providers/DreamProvider';

export default function DreamReminder() {
  const [why, setWhy] = useState();
  const { getRandomWhy } = useContext(WhyContext);
  const [dream, setDream] = useState();
  const { getOthersDream } = useContext(DreamContext);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getRandomWhy(id).then(setWhy);
    getOthersDream(id).then(setDream);
  }, []);

  const Details = () => {
    history.push(`/dreams/${id}`);
  };

  if (!why || !dream) {
    return null;
  }

  return (
    <Container>
      <h2 className="dreamReminderHeader">
        I set out to
        <br />
        <em>{why.dream.name}</em>
        <br />
        because I want to...
      </h2>
      <div className="dreamReminderBody">
        <h2>{why.description}</h2>
        <br />
      </div>
      <Button color="success" onClick={Details} size="lg" block>
        Continue
        <br />
        <HiArrowRight />
      </Button>
      <div className="otherDream">
        <h5>Someone else out there dreams to...</h5>
        <h5>{dream.name}</h5>
        <br />
        <p>neat.</p>
      </div>
    </Container>
  );
}
