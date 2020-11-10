import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { HowContext } from '../../Providers/HowProvider';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
} from 'reactstrap';
import { HiPlus, HiOutlineCheck } from 'react-icons/hi';

export default function NewDreamHow() {
  const { addHow } = useContext(HowContext);
  const [how, setHow] = useState({
    description: '',
    timeToComplete: 0,
    isRepeatable: 0,
    importance: 5,
    dreamId: 0,
  });
  const { id } = useParams();
  const history = useHistory();

  const handleFieldChange = (evt) => {
    const stateToChange = { ...how };
    stateToChange[evt.target.id] = evt.target.value;
    setHow(stateToChange);
  };

  const handleIntFieldChange = (evt) => {
    const stateToChange = { ...how };
    stateToChange[evt.target.id] = parseInt(evt.target.value);
    setHow(stateToChange);
  };

  const saveHow = () => {
    how.dreamId = parseInt(id);
    addHow(how).then(
      (document.getElementById('description').value = ''),
      (document.getElementById('timeToComplete').value = ''),
      (document.getElementById('isRepeatable').value = 0),
      (document.getElementById('importance').value = 5)
    );
  };

  const done = () => {
    how.dreamId = parseInt(id);
    addHow(how).then(history.push(`/dreams/${id}`));
  };

  return (
    <Container>
      <h2>How am I going to do it?</h2>
      <br />
      <Form>
        <fieldset>
          <FormGroup>
            <Input
              id="description"
              type="text"
              placeholder="Ex. Steal Pizza Hut's recipe"
              onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="timeToComplete">How Long Will It Take?</Label>
            <InputGroup>
              <Input
                id="timeToComplete"
                type="number"
                onChange={handleIntFieldChange}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>minutes</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="isRepeatable">How Many Times Will You Do It?</Label>
            <Input
              type="select"
              name="select"
              id="isRepeatable"
              onChange={handleIntFieldChange}
            >
              <option value={0}>Once</option>
              <option value={1}>Many</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="importance">
              How Important Is It? <br />
              {how.importance}
            </Label>
            <Input
              type="range"
              name="range"
              id="importance"
              min={0}
              max={10}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Button onClick={saveHow} color="success" size="lg" block>
              Save and Add More <br />
              <HiPlus />
            </Button>{' '}
            <Button onClick={done} size="lg" block>
              Get to Work! <br /> <HiOutlineCheck />
            </Button>
          </FormGroup>
        </fieldset>
      </Form>
    </Container>
  );
}
