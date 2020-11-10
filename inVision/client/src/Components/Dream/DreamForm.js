import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DreamContext } from '../../Providers/DreamProvider';
import { Button, Form, FormGroup, Input, Container } from 'reactstrap';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';

export default function DreamForm() {
  const { addDream } = useContext(DreamContext);
  const [dream, setDream] = useState({
    name: '',
    isDeactivated: 0,
    userProfileId: 0,
  });
  const history = useHistory();
  const userProfile = sessionStorage.getItem('userProfile');
  const activeUser = JSON.parse(userProfile);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...dream };
    stateToChange[evt.target.id] = evt.target.value;
    setDream(stateToChange);
  };

  const saveDream = () => {
    dream.userProfileId = activeUser.id;
    addDream(dream).then((res) => {
      history.push(`/newDream/${res.id}/whys`);
    });
  };

  const Cancel = () => {
    history.push(`/`);
  };

  return (
    <Container>
      <h2>What Do You Dream Of?</h2>
      <br />
      <Form>
        <fieldset>
          <FormGroup>
            <Input
              id="name"
              type="text"
              placeholder="Ex. Opening a pizza shop"
              onChange={handleFieldChange}
            />
          </FormGroup>

          <FormGroup>
            <Button onClick={saveDream} color="success" size="lg" block>
              Save and Continue <br />
              <HiArrowRight />
            </Button>{' '}
            <Button onClick={Cancel} size="lg" block>
              Cancel <br />
              <HiArrowLeft />
            </Button>
          </FormGroup>
        </fieldset>
      </Form>
    </Container>
  );
}
