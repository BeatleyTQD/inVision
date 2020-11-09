import React, { useEffect, useContext, useState } from 'react';
import { HowContext } from '../../Providers/HowProvider';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { HiLightBulb } from 'react-icons/hi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { ImCloud } from 'react-icons/im';

export default function Dream({ dream }) {
  const history = useHistory();
  const [randomHow, setRandomHow] = useState();
  const [timeAvailable, setTimeAvailable] = useState();
  const { getRandomHow } = useContext(HowContext);
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const toggle = () => setModal(!modal);

  const Details = () => {
    history.push(`dreams/${dream.id}/reminder`);
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const handleIntFieldChange = (evt) => {
    const stateToChange = { ...timeAvailable };
    stateToChange[evt.target.id] = parseInt(evt.target.value);
    setTimeAvailable(stateToChange);
  };

  const randomHowSubmit = () => {
    getRandomHow(dream.id, timeAvailable.timeAvailable)
      .then(setRandomHow)
      .then(toggleNested);
  };
  return (
    <>
      <Button color="success" onClick={Details} size="lg" block>
        {dream.name} <br /> <ImCloud />
      </Button>
      <Button color="info" onClick={toggle} block>
        Quick Task <br /> <HiLightBulb />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          How much time do you have available?
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <InputGroup>
              <Input
                id="timeAvailable"
                type="number"
                onChange={handleIntFieldChange}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>minutes</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={randomHowSubmit} block>
            Submit!
          </Button>
          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>Why don't you...</ModalHeader>
            <ModalBody>{randomHow && randomHow.description}</ModalBody>
            <ModalFooter>
              <Button color="success" onClick={toggleAll} block>
                It shall be done!
              </Button>{' '}
            </ModalFooter>
          </Modal>
        </ModalFooter>
      </Modal>
      <br />
      <br />
    </>
  );
}
